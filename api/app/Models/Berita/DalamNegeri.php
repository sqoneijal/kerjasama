<?php

namespace App\Models\Berita;

use App\Models\Common;

class DalamNegeri extends Common
{

   public function getData(array $post)
   {
      $table = $this->db->table('tb_berita');
      $table->where('jenis_berita', 'dalamnegeri');

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
