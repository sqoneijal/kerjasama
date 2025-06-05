<?php

namespace App\Models\Referensi;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Mitra extends Common
{
   public function hapus(array $post): array
   {
      try {
         $table = $this->db->table('tb_mst_mitra');
         $table->where('id', $post['id']);
         $table->delete();

         return ['status' => true, 'message' => 'Data berhasil dihapus.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   public function submit(array $post): array
   {
      try {
         $fields = ['nama', 'keterangan'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['modified_by'] = @$post['user_modified'];

         $table = $this->db->table('tb_mst_mitra');
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
      $table = $this->db->table('tb_mst_mitra');
      $table->select('id, nama, keterangan');
      $this->searchData($table, $post);
      $table->orderBy('id', 'desc');
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
      }

      return [
         'result' => $response,
         'total' => $this->getTotalData(),
      ];
   }

   private function searchData($table, array $post)
   {
      $column_search = ['nama', 'keterangan'];

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

   private function getTotalData(): int
   {
      $table = $this->db->table('tb_mst_mitra');

      return $table->countAllResults();
   }
}
