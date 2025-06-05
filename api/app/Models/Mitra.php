<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class Mitra extends Model
{

   public function hapus(array $post): array
   {
      try {
         $table = $this->db->table('tb_mitra');
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
         $fields = ['id_jenis_mou', 'id_mou', 'id_mitra', 'nomor_dokumen', 'id_lembaga', 'tanggal_mulai', 'tanggal_berakhir', 'is_tak_terhingga', 'id_dokumen', 'status_dokumen', 'nama_dokumen', 'durasi'];
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

   public function getData(array $post)
   {
      $table = $this->db->table('tb_mitra tm');
      $table->select('tm.*, tmjm.nama as nama_jenis_mou, tmm.nama as mou, tml.nama as nama_lembaga, tmm2.nama as nama_mitra');
      $table->join('tb_mst_jenis_mou tmjm', 'tmjm.id = tm.id_jenis_mou');
      $table->join('tb_mst_mou tmm', 'tmm.id = tm.id_mou');
      $table->join('tb_mst_lembaga tml', 'tml.id = tm.id_lembaga');
      $table->join('tb_mst_mitra tmm2', 'tmm2.id = tm.id_mitra');
      $this->searchData($table, $post);
      $table->orderBy('tm.id', 'desc');
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
         'total' => $this->getTotalData($post),
      ];
   }

   private function getTotalData()
   {
      $table = $this->db->table('tb_mitra tm');
      $table->join('tb_mst_jenis_mou tmjm', 'tmjm.id = tm.id_jenis_mou');
      $table->join('tb_mst_mou tmm', 'tmm.id = tm.id_mou');
      $table->join('tb_mst_lembaga tml', 'tml.id = tm.id_lembaga');
      $table->join('tb_mst_mitra tmm2', 'tmm2.id = tm.id_mitra');

      return $table->countAllResults();
   }

   private function searchData($table, array $post)
   {
      $column_search = [
         'tmm2.nama',
         'tm.nomor_dokumen',
         'tmjm.nama',
         'tmm.nama',
         'tml.nama'
      ];

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

   public function getDropdownData(): array
   {
      return [
         'daftarMoU' => $this->getDaftarMoU(),
         'daftarLembaga' => $this->getDaftarLembaga(),
         'daftarJenisMoU' => $this->getDaftarJenisMou(),
         'daftarMitra' => $this->getDaftarMitra()
      ];
   }

   private function getDaftarMitra(): array
   {
      $table = $this->db->table('tb_mst_mitra');
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
