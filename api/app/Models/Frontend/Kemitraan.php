<?php

namespace App\Models\Frontend;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Kemitraan extends Common
{

   public function getData(): array
   {
      $table = $this->db->table('tb_mitra tm');
      $table->select('tm.id, tm.id_jenis_mou, tm.id_mou, tm.nomor_dokumen, tm.tanggal_mulai, tm.tanggal_berakhir, tm.is_tak_terhingga, tm.id_dokumen, tm.status_dokumen, tm.nama_dokumen, tm.id_mitra, tm.durasi, tm.judul_kegiatan, tmm.nama as mou, coalesce(trl2.data, ARRAY[]::text[]) as bidang_kerjasama, trl.tingkat, trl.tujuan_kerjasama, trl.unit_penanggung_jawab, coalesce(trl3.data, ARRAY[]::text[]) as fakultas, coalesce(trl4.data, ARRAY[]::text[]) as prodi, tmm2.nama as mitra_nama, tml.nama as mitra_lembaga, tmm2.asal_mitra as mitra_asal, tmm2.alamat as mitra_alamat, tmm2.website as mitra_website, tmjm.nama as jenis_mou');
      $table->join('tb_mst_jenis_mou tmjm', 'tmjm.id = tm.id_jenis_mou');
      $table->join('tb_mst_mou tmm', 'tmm.id = tm.id_mou');
      $table->join('tb_ruang_lingkup trl', 'trl.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->prepareQueryBidangKerjasama()) . ') trl2', 'trl2.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->prepareQueryFakultas()) . ') trl3', 'trl3.id_mitra = tm.id', 'left');
      $table->join('(' . new RawSql($this->prepareQueryProdi()) . ') trl4', 'trl4.id_mitra = tm.id', 'left');
      $table->join('tb_mst_mitra tmm2', 'tmm2.id = tm.id_mitra', 'left');
      $table->join('tb_mst_lembaga tml', 'tml.id = tmm2.id_lembaga', 'left');
      $table->where('tm.judul_kegiatan !=', '-');
      $table->orderBy('tm.id', 'desc');

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }

         if ($val['status_dokumen'] !== 'public') {
            $response[$key]['id_dokumen'] = '';
         } else {
            $response[$key]['id_dokumen'] = $val['id_dokumen'];
         }

         $response[$key]['implementasi'] = $this->getImplementasiMitra($val['id']);
      }

      return [
         'daftarJenisMoU' => $this->getDaftarJenisMoU(),
         'content' => $response,
      ];
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
}
