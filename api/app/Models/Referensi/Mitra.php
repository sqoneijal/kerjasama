<?php

namespace App\Models\Referensi;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Mitra extends Common
{

   public function getDropdown(): array
   {
      return [
         'daftarLembaga' => $this->getDaftarLembaga(),
         'daftarAsalMitra' => [
            ['label' => 'Dalam Negeri', 'value' => 'dalamnegeri'],
            ['label' => 'Luar Negeri', 'value' => 'luarnegeri'],
         ]
      ];
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
         $fields = ['nama', 'id_lembaga', 'asal_mitra', 'alamat', 'website'];
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
      $table = $this->db->table('tb_mst_mitra tmm');
      $table->select('tmm.*, tml.nama as jenis_mitra');
      $table->join('tb_mst_lembaga tml', 'tml.id = tmm.id_lembaga', 'left');
      $this->searchData($table, $post);
      $table->orderBy('tmm.id', 'desc');
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

         $response[$key]['jwt'] = $this->generateJWT($val, 'id');
      }

      return [
         'result' => $response,
         'total' => $this->getTotalData(),
      ];
   }

   private function searchData($table, array $post)
   {
      $column_search = ['tmm.nama', 'tml.nama'];

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
