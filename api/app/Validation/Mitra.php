<?php

namespace App\Validation;

class Mitra
{

   public function submit(array $post): array
   {
      return [
         'id_jenis_mou' => [
            'label' => 'Jenis MoU',
            'rules' => 'required'
         ],
         'id_mou' => [
            'label' => 'MoU',
            'rules' => 'required'
         ],
         'id_mitra' => [
            'label' => 'Nama mitra',
            'rules' => 'required'
         ],
         'nomor_dokumen' => [
            'label' => 'Nomor dokumen',
            'rules' => 'required'
         ],
         'tanggal_mulai' => [
            'label' => 'Tanggal mulai',
            'rules' => 'required|valid_date[Y-m-d]'
         ],
         'durasi' => [
            'label' => 'Durasi',
            'rules' => 'required'
         ],
         'tanggal_berakhir' => [
            'label' => 'Tanggal berakhir',
            'rules' => @$post['durasi'] === 'sampai-dengan' ? 'required|valid_date[Y-m-d]' : 'permit_empty'
         ],
         'status_dokumen' => [
            'label' => 'Status dokumen',
            'rules' => @$post['nama_dokumen'] ? 'required' : 'permit_empty'
         ],
         'tingkat' => [
            'label' => 'Tingkat kerjasama',
            'rules' => 'required'
         ],
         'id_fakultas' => [
            'label' => 'Fakultas',
            'rules' => @$post['tingkat'] === 'fakultas' ? 'required|valid_json' : 'permit_empty'
         ],
         'id_prodi' => [
            'label' => 'Program studi',
            'rules' => @$post['tingkat'] === 'prodi' ? 'required|valid_json' : 'permit_empty'
         ],
         'unit_penanggung_jawab' => [
            'label' => 'Unit penanggung jawab',
            'rules' => 'required'
         ],
         'tujuan_kerjasama' => [
            'label' => 'Tujuan kerja sama',
            'rules' => 'required'
         ],
         'judul_kegiatan' => [
            'label' => 'Judul kegiatan',
            'rules' => 'required'
         ],
      ];
   }
}
