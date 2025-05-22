<?php

namespace App\Models\Tentang;

use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class Sekretariat extends Model
{
   public function getData(): array
   {
      $table = $this->db->table('tb_sekretariat');
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

   public function submit(array $post): array
   {
      try {
         $table = $this->db->table('tb_sekretariat');
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
}
