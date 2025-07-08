<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;

class Mitra extends Common
{

   public function getDetail(array $post): array
   {
      $table = $this->db->table('tb_mitra tm');
      $table->select('tm.*, tmm.nama as mou, coalesce(trl2.data, ARRAY[]::text[]) as bidang_kerjasama, trl.tingkat, trl.tujuan_kerjasama, trl.unit_penanggung_jawab, coalesce(trl3.data, ARRAY[]::text[]) as fakultas, coalesce(trl4.data, ARRAY[]::text[]) as prodi, tmm2.nama as mitra_nama, tml.nama as mitra_lembaga, tmm2.asal_mitra as mitra_asal, tmm2.alamat as mitra_alamat, tmm2.website as mitra_website');
      $table->join('tb_mst_mou tmm', 'tmm.id = tm.id_mou');
      $table->join('tb_ruang_lingkup trl', 'trl.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->prepareQueryBidangKerjasama()) . ') trl2', 'trl2.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->prepareQueryFakultas()) . ') trl3', 'trl3.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->prepareQueryProdi()) . ') trl4', 'trl4.id_mitra = tm.id', 'left');
      $table->join('tb_mst_mitra tmm2', 'tmm2.id = tm.id_mitra', 'left');
      $table->join('tb_mst_lembaga tml', 'tml.id = tmm2.id_lembaga', 'left');
      $table->where('tm.id', $post['id']);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }

         $response['implementasi'] = $this->getImplementasiMitra($post['id']);
      }
      return $response;
   }

   private function getImplementasiMitra(int $id_mitra): array
   {
      $table = $this->db->table('tb_implementasi ti');
      $table->select('ti.id, ti.dilakukan, ti.tgl_pelaksanaan, ti.capaian_output, ti.status_evaluasi, ti.dokumentasi_pendukung');
      $table->where('ti.id_mitra', $id_mitra);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }
      return $response;
   }

   private function prepareQueryProdi(): string
   {
      $table = $this->db->table('tb_ruang_lingkup trl');
      $table->select('trl.id_mitra, array_agg(tmp.nama order by tmp.nama) as data');
      $table->join('tb_ruang_lingkup_prodi trlp', 'trlp.id_ruang_lingkup = trl.id');
      $table->join('tb_mst_prodi tmp', 'tmp.id = trlp.id_prodi');
      $table->groupBy('trl.id_mitra');

      return $table->getCompiledSelect();
   }

   private function prepareQueryFakultas(): string
   {
      $table = $this->db->table('tb_ruang_lingkup trl');
      $table->select('trl.id_mitra, array_agg(tmf.nama order by tmf.nama) as data');
      $table->join('tb_ruang_lingkup_fakultas trlf', 'trlf.id_ruang_lingkup = trl.id');
      $table->join('tb_mst_fakultas tmf', 'tmf.id = trlf.id_fakultas');
      $table->groupBy('trl.id_mitra');

      return $table->getCompiledSelect();
   }

   private function prepareQueryBidangKerjasama(): string
   {
      $table = $this->db->table('tb_ruang_lingkup trl');
      $table->select('trl.id_mitra, array_agg(tmbk.nama order by tmbk.nama) as data');
      $table->join('tb_bidang_kerjasama tbk', 'tbk.id_ruang_lingkup = trl.id');
      $table->join('tb_mst_bidang_kerjasama tmbk', 'tmbk.id = tbk.id_bidang_kerjasama');
      $table->groupBy('trl.id_mitra');

      return $table->getCompiledSelect();
   }

   public function hapus(array $post): array
   {
      try {
         $table = $this->db->table('tb_mitra');
         $table->where('id', $post['id']);
         $table->delete();
         return ['status' => true, 'message' => 'Data berhasil dihapus.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function submit(array $post): array
   {
      try {
         $fields = ['id_jenis_mou', 'id_mou', 'id_mitra', 'nomor_dokumen', 'tanggal_mulai', 'tanggal_berakhir', 'is_tak_terhingga', 'id_dokumen', 'status_dokumen', 'nama_dokumen', 'durasi', 'judul_kegiatan'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['modified_by'] = @$post['user_modified'];
         $data['is_tak_terhingga'] = $post['durasi'] === 'tak-terbatas' ? true : false;

         $id_mitra = @$post['id'] ?? null;

         $table = $this->db->table('tb_mitra');
         if ($post['pageType'] === 'update') {
            $data['update_at'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);
         } else {
            $data['create_at'] = new RawSql('now()');

            $table->insert($data);
            $id_mitra = $this->db->insertID('tb_mitra_id_seq');
         }

         $this->submitRuangLingkup($id_mitra, $post);

         return ['status' => true, 'message' => 'Data berhasil disimpan.', 'post' => $data];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function submitRuangLingkup(int $id_mitra, array $post): void
   {
      $table = $this->db->table('tb_ruang_lingkup');

      $fields = ['tingkat', 'tujuan_kerjasama', 'unit_penanggung_jawab'];
      foreach ($fields as $field) {
         if (@$post[$field]) {
            $data[$field] = $post[$field];
         } else {
            $data[$field] = null;
         }
      }

      $data['id_mitra'] = $id_mitra;
      $id_ruang_lingkup = @$post['id_ruang_lingkup'] ?? null;

      if ($post['pageType'] === 'update') {
         $table->where('id', $post['id_ruang_lingkup']);
         $table->update($data);
      } else {
         $table->insert($data);

         $id_ruang_lingkup = $this->db->insertID('tb_ruang_lingkup_id_seq');
      }

      $this->submitRuangLingkupKerjasama($id_ruang_lingkup, $post);
      $this->submitRuangLingkupFakultas($id_ruang_lingkup, $post);
      $this->submitRuangLingkupProdi($id_ruang_lingkup, $post);
   }

   private function submitRuangLingkupProdi(int $id_ruang_lingkup, array $post): void
   {
      $table = $this->db->table('tb_ruang_lingkup_prodi');

      $this->deleteRuangLingkup($table, $id_ruang_lingkup);

      $id_prodi = json_decode(@$post['id_prodi'], true);

      if (empty($id_prodi)) {
         return;
      }

      $data = [];
      foreach ($id_prodi as $row) {
         $data[] = [
            'id_ruang_lingkup' => $id_ruang_lingkup,
            'id_prodi' => isset($row['id']) ? $row['id_prodi'] : $row['value'],
         ];
      }

      if (empty($data)) {
         return;
      }

      $table->ignore(true)->insertBatch($data);
   }

   private function submitRuangLingkupFakultas(int $id_ruang_lingkup, array $post): void
   {
      $table = $this->db->table('tb_ruang_lingkup_fakultas');

      $this->deleteRuangLingkup($table, $id_ruang_lingkup);

      $id_fakultas = json_decode(@$post['id_fakultas'], true);

      if (empty($id_fakultas)) {
         return;
      }

      $data = [];
      foreach ($id_fakultas as $row) {
         $data[] = [
            'id_ruang_lingkup' => $id_ruang_lingkup,
            'id_fakultas' => isset($row['id']) ? $row['id_fakultas'] : $row['value'],
         ];
      }

      if (empty($data)) {
         return;
      }

      $table->ignore(true)->insertBatch($data);
   }

   private function submitRuangLingkupKerjasama(int $id_ruang_lingkup, array $post): void
   {
      $table = $this->db->table('tb_bidang_kerjasama');

      $this->deleteRuangLingkup($table, $id_ruang_lingkup);

      $bidang_kerjasama = json_decode(@$post['bidang_kerjasama'], true);

      if (empty($bidang_kerjasama)) {
         return;
      }

      $data = [];
      foreach ($bidang_kerjasama as $row) {
         $data[] = [
            'id_ruang_lingkup' => $id_ruang_lingkup,
            'id_bidang_kerjasama' => isset($row['id']) ? $row['id_bidang_kerjasama'] : $row['value'],
         ];
      }

      if (empty($data)) {
         return;
      }

      $table->ignore(true)->insertBatch($data);
   }

   private function deleteRuangLingkup($table, int $id_ruang_lingkup): void
   {
      $table->where('id_ruang_lingkup', $id_ruang_lingkup);
      $table->delete();
   }

   public function getData(array $post)
   {
      $table = $this->db->table('tb_mitra tm');
      $table->select('tmm.nama as mou, tmm2.nama as nama_mitra, tml.nama as nama_lembaga, tm.*, coalesce(trl2.data, \'[]\') as bidang_kerjasama, trl.tingkat, trl.tujuan_kerjasama, trl.unit_penanggung_jawab, coalesce(trl3.data, \'[]\') as id_fakultas, coalesce(trl4.data, \'[]\') as id_prodi, trl.id as id_ruang_lingkup');
      $table->join('tb_mst_jenis_mou tmjm', 'tmjm.id = tm.id_jenis_mou');
      $table->join('tb_mst_mou tmm', 'tmm.id = tm.id_mou');
      $table->join('tb_mst_mitra tmm2', 'tmm2.id = tm.id_mitra');
      $table->join('tb_mst_lembaga tml', 'tml.id = tmm2.id_lembaga');
      $table->join('tb_ruang_lingkup trl', 'trl.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->subQueryBidangKerjasama()) . ') trl2', 'trl2.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->subQueryRuangLingkupFakultas()) . ') trl3', 'trl3.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->subQueryRuangLingkupProdi()) . ') trl4', 'trl4.id_mitra = tm.id', 'left');
      $this->searchData($table, $post);
      $table->orderBy('tm.id', 'desc');
      $table->limit((int) $post['limit'], (int) $post['offset']);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }

      return [
         'result' => $response,
         'total' => $this->getTotalData($post),
      ];
   }

   private function subQueryRuangLingkupProdi(): string
   {
      $table = $this->db->table('tb_ruang_lingkup trl');
      $table->select('trl.id_mitra,
         json_agg(json_build_object(
            \'id\', trlp.id,
            \'id_ruang_lingkup\', trlp.id_ruang_lingkup,
            \'id_prodi\', trlp.id_prodi,
            \'prodi\', tmp.jenjang || \' - \' || tmp.nama
         )) as data');
      $table->join('tb_ruang_lingkup_prodi trlp', 'trlp.id_ruang_lingkup = trl.id');
      $table->join('tb_mst_prodi tmp', 'tmp.id = trlp.id_prodi');
      $table->groupBy('trl.id_mitra');

      return $table->getCompiledSelect();
   }

   private function subQueryRuangLingkupFakultas(): string
   {
      $table = $this->db->table('tb_ruang_lingkup trl');
      $table->select('trl.id_mitra,
         json_agg(json_build_object(
            \'id\', trlf.id,
            \'id_ruang_lingkup\', trlf.id_ruang_lingkup,
            \'id_fakultas\', trlf.id_fakultas,
            \'fakultas\', tmf.nama
         )) as data');
      $table->join('tb_ruang_lingkup_fakultas trlf', 'trlf.id_ruang_lingkup = trl.id');
      $table->join('tb_mst_fakultas tmf', 'tmf.id = trlf.id_fakultas');
      $table->groupBy('trl.id_mitra');

      return $table->getCompiledSelect();
   }

   private function subQueryBidangKerjasama(): string
   {
      $table = $this->db->table('tb_ruang_lingkup trl');
      $table->select('trl.id_mitra,
         json_agg(json_build_object(
            \'id\', tbk.id,
            \'id_ruang_lingkup\', tbk.id_ruang_lingkup,
            \'id_bidang_kerjasama\', tbk.id_bidang_kerjasama,
            \'bidang_kerjasama\', tmbk.nama
         )) as data');
      $table->join('tb_bidang_kerjasama tbk', 'tbk.id_ruang_lingkup = trl.id');
      $table->join('tb_mst_bidang_kerjasama tmbk', 'tmbk.id = tbk.id_bidang_kerjasama');
      $table->groupBy('trl.id_mitra');

      return $table->getCompiledSelect();
   }

   private function getTotalData()
   {
      $table = $this->db->table('tb_mitra tm');
      $table->join('tb_mst_jenis_mou tmjm', 'tmjm.id = tm.id_jenis_mou');
      $table->join('tb_mst_mou tmm', 'tmm.id = tm.id_mou');
      $table->join('tb_mst_mitra tmm2', 'tmm2.id = tm.id_mitra');

      return $table->countAllResults();
   }

   private function searchData($table, array $post)
   {
      $column_search = ['tmm.nama', 'tmm2.nama', 'tml.nama', 'tm.nomor_dokumen', 'tm.judul_kegiatan'];

      $i = 0;
      foreach ($column_search as $item) {
         if (@$post['search']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($post['search'])));
            } else {
               $table->orLike('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($post['search'])));
            }

            if (count($column_search) - 1 === $i) {
               $table->groupEnd();
            }
         }
         $i++;
      }
   }

   public function getDropdownData(): array
   {
      return [
         'daftarMoU' => $this->getDaftarMoU(),
         'daftarJenisMoU' => $this->getDaftarJenisMou(),
         'daftarMitra' => $this->getDaftarMitra(),
         'daftarBidangKerjasama' => $this->getDaftarBidangKerjasama(),
         'daftarFakultas' => $this->getDaftarFakutlas(),
         'daftarProdi' => $this->getDaftarProdi(),
      ];
   }

   private function getDaftarMitra(): array
   {
      $table = $this->db->table('tb_mst_mitra tmm');
      $table->select('tmm.id as value, tmm.nama || \' - \' || tml.nama as label');
      $table->join('tb_mst_lembaga tml', 'tml.id = tmm.id_lembaga');
      $table->orderBy('tmm.nama');

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }
      return $response;
   }

   private function getDaftarJenisMou(): array
   {
      $table = $this->db->table('tb_mst_jenis_mou');
      $table->select('id as value, nama as label');
      $table->orderBy('nama');

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }
      return $response;
   }

   private function getDaftarMoU(): array
   {
      $table = $this->db->table('tb_mst_mou');
      $table->select('id as value, nama as label');
      $table->orderBy('nama');

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }
      return $response;
   }
}
