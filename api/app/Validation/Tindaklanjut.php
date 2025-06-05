<?php

namespace App\Validation;

class Tindaklanjut
{

   public function submit(): array
   {
      return [
         'id_mitra' => [
            'rules' => 'required|numeric',
            'label' => 'Nama mitra'
         ]
      ];
   }
}
