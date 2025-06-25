<?php

namespace App\Models\Frontend;

use App\Models\Common;

class Kemitraan extends Common
{

   public function getData(): array
   {
      $table = $this->db->table('tb_mitra tm');
      $table->select('tm.id, tm.judul_kegiatan, tm.nomor_dokumen, tm.tanggal_mulai, tm.tanggal_berakhir, tm.is_tak_terhingga, tm.status_dokumen, tm.id_dokumen');
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
      }
      return $response;
   }
}
