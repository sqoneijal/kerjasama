<?php

namespace App\Validation\Referensi;

class Layanan
{
   public function submit()
   {
      return [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama layanan'
         ],
         'keterangan' => [
            'rules' => 'required',
            'label' => 'Keterangan layanan'
         ],
      ];
   }
}
