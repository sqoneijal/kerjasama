<?php

namespace App\Validation\Referensi;

class Tindaklanjut
{

   public function submit(): array
   {
      return [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama'
         ]
      ];
   }
}
