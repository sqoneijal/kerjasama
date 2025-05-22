<?php

namespace App\Validation\Referensi;

class Mou
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
