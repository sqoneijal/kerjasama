<?php

namespace App\Models\Frontend;

use App\Models\Common;

class Berita extends Common
{

   public function getData(array $post): array
   {
      helper('text');

      $table = $this->db->table('tb_berita');
      $table->orderBy('id', 'desc');
      $table->limit(5, (int) $post['page'] * 5);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            if ($field === 'content') {
               $response[$key][$field] = word_limiter(strip_tags(html_entity_decode($val[$field])), 33);
            } else {
               $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
         }
      }
      return $response;
   }

   public function getDetailBerita(string $slug): array
   {
      $detailBerita = $this->getDetailBeritaBySlug($slug);
      return [
         'berita' => $detailBerita,
         'banyakDilihat' => $this->getBeritaBanyakDilihat(),
         'beritaLainnya' => $this->getDaftarBeritaLainnya($slug, $detailBerita['jenis_berita'])
      ];
   }

   private function getDaftarBeritaLainnya(string $slug, string $jenis_berita): array
   {
      $table = $this->db->table('tb_berita tb');
      $table->select('tb.judul, tb.thumbnail, tb.create_at, tb.slug, coalesce(tbl.jumlah, 0) as likes');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_likes group by id_berita) tbl', 'tbl.id_berita = tb.id', 'left');
      $table->where('tb.jenis_berita', $jenis_berita);
      $table->where('tb.slug !=', $slug);
      $table->orderBy('tb.id', 'desc');
      $table->limit(6);

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

   private function getBeritaBanyakDilihat(): array
   {
      $table = $this->db->table('tb_berita tb');
      $table->select('tb.judul, tb.slug, coalesce(tbl.jumlah, 0) as likes, tb.create_at, coalesce(tbv.jumlah, 0) as views');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_likes group by id_berita) tbl', 'tbl.id_berita = tb.id', 'left');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_views group by id_berita) tbv', 'tbv.id_berita = tb.id', 'left');
      $table->orderBy('tbv.jumlah', 'desc');
      $table->limit(5);

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

   private function getDetailBeritaBySlug(string $slug): array
   {
      $table = $this->db->table('tb_berita tb');
      $table->select('tb.*, coalesce(tbv.jumlah, 0) as views, coalesce(tbl.jumlah, 0) as likes');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_views group by id_berita) tbv', 'tbv.id_berita = tb.id', 'left');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_likes group by id_berita) tbl', 'tbl.id_berita = tb.id', 'left');
      $table->where('tb.slug', $slug);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
         unset($response['modified_by'], $response['id']);
      }
      return $response;
   }
}
