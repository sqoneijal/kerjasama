<?php

namespace App\Models\Berita;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class Luarnegeri extends Common
{
   public function hapus(array $post): array
   {
      try {
         $table = $this->db->table('tb_berita');
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
         $fields = ['judul', 'thumbnail'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['modified_by'] = @$post['user_modified'];
         $data['content'] = htmlentities($post['content']);
         $data['slug'] = url_title($data['judul'], '-', true) . '-' . time();
         $data['jenis_berita'] = 'luarnegeri';

         $id_berita = null;

         $table = $this->db->table('tb_berita');
         if ($post['pageType'] === 'update') {
            $data['update_at'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);

            $id_berita = $post['id'];
         } else {
            $data['create_at'] = new RawSql('now()');

            $table->insert($data);
            $id_berita = $this->db->insertID('tb_berita_id_seq');
         }

         $this->handleSubmitKategori($post['selectedKategori'], $id_berita, @$post['user_modified']);
         $this->handleSubmitTags($post['selectedTags'], $id_berita, @$post['user_modified']);

         return ['status' => true, 'message' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'message' => $e->getMessage()];
      }
   }

   private function handleSubmitTags($selectedTags, int $id_berita, $user_modified = null): void
   {
      $daftarTags = json_decode($selectedTags, true);

      if (count($daftarTags) > 0) {
         $pushNewTags = [];
         $existsTags = [];

         foreach ($daftarTags as $row) {
            if (isset($row['customOption']) === true) {
               array_push($pushNewTags, [
                  'nama' => $row['label'],
                  'slug' => url_title($row['label'], '-', true),
                  'create_at' => new RawSql('now()'),
                  'modified_by' => $user_modified
               ]);
            } else {
               $existsTags[] = $row['value'];
            }
         }

         if (count($pushNewTags) > 0) {
            $this->insertMasterTags($pushNewTags);
         }

         $this->insertTagsBerita($id_berita, $existsTags, $pushNewTags);
      }
   }

   private function insertTagsBerita(int $id_berita, array $existsTags, array $pushNewTags): void
   {
      $newIDMasterTags = $this->getIDMasterTags($pushNewTags);
      $idTags = array_merge($newIDMasterTags, $existsTags);

      $data = [];
      foreach ($idTags as $ID) {
         if ($ID) {
            array_push($data, [
               'id_berita' => $id_berita,
               'id_tags' => $ID
            ]);
         }
      }

      $table = $this->db->table('tb_tags_berita');
      $table->ignore(true)->insertBatch($data);
   }

   private function getIDMasterTags(array $pushNewTags): array
   {
      $response = [];
      if (!empty($pushNewTags) > 0) {
         $slug = [];
         foreach ($pushNewTags as $row) {
            $slug[] = $row['slug'];
         }

         $table = $this->db->table('tb_mst_tags_berita');
         $table->select('id');
         $table->whereIn('slug', $slug);

         $get = $table->get();
         $result = $get->getResultArray();
         $get->freeResult();

         if (count($result) > 0) {
            foreach ($result as $row) {
               $response[] = $row['id'];
            }
         }
      }
      return $response;
   }

   private function insertMasterTags(array $data): void
   {
      $table = $this->db->table('tb_mst_tags_berita');
      $table->insertBatch($data);
   }

   private function handleSubmitKategori($selectedKategori, int $id_berita, $user_modified = null): void
   {
      $daftarKategori = json_decode($selectedKategori, true);

      if (count($daftarKategori) > 0) {
         $pushNewKategori = [];
         $existsKategori = [];

         foreach ($daftarKategori as $row) {
            if (isset($row['customOption']) === true) {
               array_push($pushNewKategori, [
                  'nama' => $row['label'],
                  'slug' => url_title($row['label'], '-', true),
                  'create_at' => new RawSql('now()'),
                  'modified_by' => $user_modified
               ]);
            } else {
               $existsKategori[] = $row['value'];
            }
         }

         if (count($pushNewKategori) > 0) {
            $this->insertMasterKategori($pushNewKategori);
         }

         $this->insertKategoriBerita($id_berita, $existsKategori, $pushNewKategori);
      }
   }

   private function insertKategoriBerita(int $id_berita, array $existsKategori, array $pushNewKategori): void
   {
      $newIDMasterKategori = $this->getIDMasterKategori($pushNewKategori);
      $idKategori = array_merge($newIDMasterKategori, $existsKategori);

      $data = [];
      foreach ($idKategori as $ID) {
         if ($ID) {
            array_push($data, [
               'id_berita' => $id_berita,
               'id_kategori' => $ID
            ]);
         }
      }

      $table = $this->db->table('tb_kategori_berita');
      $table->ignore(true)->insertBatch($data);
   }

   private function getIDMasterKategori(array $pushNewKategori): array
   {
      $response = [];
      if (!empty($pushNewKategori) > 0) {
         $slug = [];
         foreach ($pushNewKategori as $row) {
            $slug[] = $row['slug'];
         }

         $table = $this->db->table('tb_mst_kategori_berita');
         $table->select('id');
         $table->whereIn('slug', $slug);

         $get = $table->get();
         $result = $get->getResultArray();
         $get->freeResult();

         if (count($result) > 0) {
            foreach ($result as $row) {
               $response[] = $row['id'];
            }
         }
      }
      return $response;
   }

   private function insertMasterKategori(array $data): void
   {
      $table = $this->db->table('tb_mst_kategori_berita');
      $table->insertBatch($data);
   }

   public function getData(array $post)
   {
      $table = $this->db->table('tb_berita tb');
      $table->select('tb.id, tb.judul, tb.content, tkb.kategori, tkb.kategori, ttb.tags, tb.thumbnail, tb.slug');
      $table->join('(select tkb.id_berita, json_agg(json_build_object(\'nama\', tmkb.nama, \'slug\', tmkb.slug, \'id_kategori\', tkb.id_kategori)) as kategori from tb_kategori_berita tkb
      join tb_mst_kategori_berita tmkb on tmkb.id = tkb.id_kategori
      group by tkb.id_berita) tkb', 'tkb.id_berita = tb.id', 'left');
      $table->join('(select ttb.id_berita, json_agg(json_build_object(\'nama\', tmtb.nama, \'slug\', tmtb.slug, \'id_tags\', ttb.id_tags)) as tags
      from tb_tags_berita ttb
      join tb_mst_tags_berita tmtb on tmtb.id = ttb.id_tags
      group by ttb.id_berita) ttb', 'ttb.id_berita = tb.id', 'left');
      $table->where('tb.jenis_berita', 'luarnegeri');
      $table->orderBy('tb.id', 'desc');

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
         'results' => $response,
         'total' => $this->countTotalBerita()
      ];
   }

   private function countTotalBerita(): int
   {
      $table = $this->db->table('tb_berita');
      $table->where('jenis_berita', 'luarnegeri');

      return $table->countAllResults();
   }

   public function getDropdown()
   {
      return [
         'daftarKategori' => $this->getDaftarKategori(),
         'daftarTags' => $this->getDaftarTags(),
      ];
   }

   private function getDaftarTags(): array
   {
      $table = $this->db->table('tb_mst_tags_berita');
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

   private function getDaftarKategori(): array
   {
      $table = $this->db->table('tb_mst_kategori_berita');
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
