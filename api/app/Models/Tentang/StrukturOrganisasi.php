<?php

namespace App\Models\Tentang;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class StrukturOrganisasi extends Common
{

   public function submit(array $post): array
   {
      try {
         $table = $this->db->table('tb_struktur_organisasi');
         $data = [
            'content' => htmlentities($post['content']),
            'update_at' => new RawSql('now()')
         ];

         $table->update($data, ['id' => 1]);
         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function getStrukturOrganisasi(): array
   {
      $table = $this->db->table('tb_struktur_organisasi');
      $table->where('id', 1);

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
