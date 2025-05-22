<?php

namespace App\Validation\Referensi;

class Lembaga
{
   public function submit(): array
   {
      return [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama lembaga',
         ]
      ];
   }
}
