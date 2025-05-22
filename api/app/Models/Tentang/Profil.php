<?php

namespace App\Models\Tentang;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Profil extends Common
{

   public function updateProfil(array $post): array
   {
      try {
         $table = $this->db->table('tb_profil');
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

   public function getProfil(): array
   {
      $table = $this->db->table('tb_profil');

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
