<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;

class Implementasi extends Common
{

   public function hapus(array $post): array
   {
      try {
         $table = $this->db->table('tb_implementasi');
         $table->where('id', $post['id']);
         $table->delete();
         return ['status' => true, 'message' => 'Data berhasil dihapus.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function getDropdown(): array
   {
      return [
         'daftarMitra' => $this->getDaftarMitra(),
         'daftarBentukTindakLanjut' => $this->getDaftarBentukTindakLanjut(),
      ];
   }

   private function getDaftarMitra(): array
   {
      $table = $this->db->table('tb_mitra tm');
      $table->select('tm.id as value, tm.judul_kegiatan || \' - \' || tmm.nama || \' (\' || tm.nomor_dokumen || \')\' as label');
      $table->join('tb_mst_mitra tmm', 'tmm.id = tm.id_mitra');

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

   public function submit(array $post): array
   {
      try {
         $fields = ['tgl_pelaksanaan', 'id_mitra', 'status_evaluasi', 'judul_kegiatan', 'bentuk_tindak_lanjut_id', 'nama_dokumen', 'id_dokumen', 'path_dokumen'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['modified_by'] = $post['user_modified'];
         $data['dilakukan'] = htmlentities($post['dilakukan']);
         $data['capaian_output'] = htmlentities($post['capaian_output']);
         $data['dokumentasi_pendukung'] = htmlentities($post['dokumentasi_pendukung']);

         $table = $this->db->table('tb_implementasi');
         if ($post['pageType'] === 'update') {
            $data['update_at'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);
         } else {
            $data['create_at'] = new RawSql('now()');

            $table->insert($data);
         }
         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function getData(array $post): array
   {
      $table = $this->db->table('tb_implementasi ti');
      $table->select('ti.*, tmm.nama, tm.nomor_dokumen, tm.id_mitra, ti.id_dokumen');
      $table->join('tb_mitra tm', 'tm.id = ti.id_mitra');
      $table->join('tb_mst_mitra tmm', 'tmm.id = tm.id_mitra');
      $this->searchData($table, $post);
      $table->orderBy('ti.id', 'desc');
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

         $response[$key]['jwt'] = $this->generateJWT($val);
      }

      return [
         'results' => $response,
         'total' => $this->countTotalData()
      ];
   }

   private function searchData($table, array $post)
   {
      $column_search = ['tmm.nama', 'tmm2.nama', 'tml.nama', 'tm.nomor_dokumen', 'ti.judul_kegiatan'];

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

   private function countTotalData(): int
   {
      $table = $this->db->table("tb_implementasi");

      return $table->countAllResults();
   }
}
