<?php

namespace App\Validation\Berita;

class Luarnegeri
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
