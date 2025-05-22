<?php

namespace App\Controllers\Tentang;

use App\Controllers\BaseController;
use App\Models\Tentang\StrukturOrganisasi as Model;

class Strukturorganisasi extends BaseController
{
   public function getData()
   {
      if ($this->request->is('post')) {
         $model = new Model();
         $content = $model->getStrukturOrganisasi();

         return $this->respondCreated($content);
      }
   }

   public function submit()
   {
      if ($this->request->is('post')) {
         $model = new Model();
         $content = $model->submit($this->request->getPost());

         return $this->respondCreated($content);
      }
   }
}
