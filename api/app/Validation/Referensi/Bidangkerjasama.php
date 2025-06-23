<?php

namespace App\Validation\Referensi;

class Bidangkerjasama
{

   public function submit(): array
   {
      return [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama bidang kerjasama'
         ]
      ];
   }
}
