<?php

namespace App\Models\Frontend;

use CodeIgniter\Model;

class Tentang extends Model
{

   public function getDataProfil(): array
   {
      $table = $this->db->table('tb_profil');
      $table->select('nama, content');

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }

   public function getDataStrukturOrganisasi(): array
   {
      $table = $this->db->table('tb_struktur_organisasi');
      $table->select('nama, content');

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }

   public function getDataSekretariat(): array
   {
      $table = $this->db->table('tb_sekretariat');
      $table->select('nama, content');

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }
}
