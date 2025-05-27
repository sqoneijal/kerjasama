<?php

namespace App\Validation\Berita;

class DalamNegeri
{

   public function submit(): array
   {
      return [
         'judul' => [
            'rules' => 'required',
            'label' => 'Judul berita'
         ]
      ];
   }
}
