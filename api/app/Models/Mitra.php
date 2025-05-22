<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class Mitra extends Model
{

   public function submit(array $post): array
   {
      try {
         $fields = ['id_jenis_mou', 'id_mou', 'nama_mitra', 'nomor_dokumen', 'id_lembaga', 'tanggal_mulai', 'tanggal_berakhir', 'is_tak_terhingga', 'id_dokumen', 'status_dokumen', 'nama_dokumen'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['modified_by'] = @$post['user_modified'];
         $data['is_tak_terhingga'] = $post['durasi'] === 'tak-terbatas' ? true : false;

         $table = $this->db->table('tb_mitra');

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

   public function getData()
   {
      $table = $this->db->table('tb_mitra tm');
      $table->select('tm.*, tmjm.nama as nama_jenis_mou, tmm.nama as mou, tml.nama as nama_lembaga');
      $table->join('tb_mst_jenis_mou tmjm', 'tmjm.id = tm.id_jenis_mou');
      $table->join('tb_mst_mou tmm', 'tmm.id = tm.id_mou');
      $table->join('tb_mst_lembaga tml', 'tml.id = tm.id_lembaga');
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
      }
      return $response;
   }

   public function getDropdownData(): array
   {
      return [
         'daftarMoU' => $this->getDaftarMoU(),
         'daftarLembaga' => $this->getDaftarLembaga(),
         'daftarJenisMoU' => $this->getDaftarJenisMou(),
      ];
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

   private function getDaftarLembaga(): array
   {
      $table = $this->db->table('tb_mst_lembaga');
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
