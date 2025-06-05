<?php

namespace App\Models;

class Tindaklanjut extends Common
{

   public function getDropdown(): array
   {
      return [
         'daftarMitra' => $this->getDaftarMitra(),
      ];
   }

   private function getDaftarMitra(): array
   {
      $table = $this->db->table('tb_mitra tm');
      $table->select('tm.id as value, tmm.nama || \' (\' || tm.nomor_dokumen || \')\' as label');
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
}
