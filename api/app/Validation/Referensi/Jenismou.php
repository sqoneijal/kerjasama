<?php

namespace App\Validation\Referensi;

class Jenismou
{

   public function submit(): array
   {
      return [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama jenis MoU'
         ]
      ];
   }
}
