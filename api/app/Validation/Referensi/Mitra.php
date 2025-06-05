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
         'id_lembaga' => [
            'rules' => 'required',
            'label' => 'Jenis mitra'
         ],
         'asal_mitra' => [
            'rules' => 'required',
            'label' => 'Negara/Asal Mitra'
         ],
      ];
   }
}
