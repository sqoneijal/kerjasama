<?php

namespace App\Validation\Referensi;

class Mitra
{
   public function submit()
   {
      return [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama mitra'
         ],
      ];
   }
}
