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
         'nama_mitra' => [
            'label' => 'Nama mitra',
            'rules' => 'required'
         ],
         'nomor_dokumen' => [
            'label' => 'Nomor dokumen',
            'rules' => 'required'
         ],
         'id_lembaga' => [
            'label' => 'Lembaga',
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
         ]
      ];
   }
}
