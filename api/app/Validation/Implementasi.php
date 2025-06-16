<?php

namespace App\Validation;

class Implementasi
{

   public function submit(): array
   {
      return [
         'id_mitra' => [
            'rules' => 'required|numeric',
            'label' => 'Nama mitra'
         ],
         'tgl_pelaksanaan' => [
            'rules' => 'required',
            'label' => 'Tanggal pelaksanaan'
         ],
         'status_evaluasi' => [
            'rules' => 'required',
            'label' => 'Status evaluasi'
         ],
      ];
   }
}
