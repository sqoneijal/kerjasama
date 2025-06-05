<?php

namespace App\Models\Frontend;

use App\Models\Common;

class Beranda extends Common
{

   public function getData(): array
   {
      return [
         'dalamNegeri' => $this->getDataDalamNegeri(),
         'luarNegeri' => $this->getDataLuarNegeri(),
         'terbaru' => $this->getBeritaTerbaru(),
         'banyakDilihat' => $this->getBeritaBanyakDilihat(),
         'trending' => $this->getBeritaTrending(),
      ];
   }

   private function getBeritaTrending(): array
   {
      $table = $this->db->table('tb_berita tb');
      $table->select('tb.judul, tb.slug, coalesce(tbl.jumlah, 0) as likes, tb.create_at');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_likes group by id_berita) tbl', 'tbl.id_berita = tb.id', 'left');
      $table->where('tbl.jumlah >', 0);
      $table->orderBy('tbl.jumlah', 'desc');
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

   private function getBeritaTerbaru(): array
   {
      $table = $this->db->table('tb_berita tb');
      $table->select('tb.judul, tb.slug, tb.thumbnail, coalesce(tbl.jumlah, 0) as likes, tb.create_at');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_likes group by id_berita) tbl', 'tbl.id_berita = tb.id', 'left');
      $table->orderBy('id', 'desc');
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

   private function getDataDalamNegeri(): array
   {
      helper('text');

      $table = $this->db->table('tb_berita tb');
      $table->select('tb.judul, tb.slug, tb.thumbnail, coalesce(tbl.jumlah, 0) as likes, tb.create_at, tb.content');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_likes group by id_berita) tbl', 'tbl.id_berita = tb.id', 'left');
      $table->where('tb.jenis_berita', 'dalamnegeri');
      $table->orderBy('id', 'desc');
      $table->limit(5);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            if ($field === 'content') {
               $response[$key][$field] = word_limiter(strip_tags(html_entity_decode($val['content'])), 10);
            } else {
               $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
         }
      }
      return $response;
   }

   private function getDataLuarNegeri(): array
   {
      helper('text');

      $table = $this->db->table('tb_berita tb');
      $table->select('tb.judul, tb.slug, tb.thumbnail, coalesce(tbl.jumlah, 0) as likes, tb.create_at, tb.content');
      $table->join('(select id_berita, count(*) as jumlah from tb_berita_likes group by id_berita) tbl', 'tbl.id_berita = tb.id', 'left');
      $table->where('tb.jenis_berita', 'luarnegeri');
      $table->orderBy('id', 'desc');
      $table->limit(5);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            if ($field === 'content') {
               $response[$key][$field] = word_limiter(strip_tags(html_entity_decode($val['content'])), 10);
            } else {
               $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
         }
      }
      return $response;
   }
}
