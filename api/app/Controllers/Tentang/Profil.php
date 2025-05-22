<?php

namespace App\Controllers\Tentang;

use App\Controllers\BaseController;
use App\Models\Tentang\Profil as Model;

class Profil extends BaseController
{
   public function getData()
   {
      if ($this->request->is('post')) {
         $model = new Model();
         $content = $model->getProfil();

         return $this->respondCreated($content);
      }
   }

   public function submit()
   {
      if ($this->request->is('post')) {
         $model = new Model();
         $content = $model->updateProfil($this->request->getPost());

         return $this->respondCreated($content);
      }
   }
}
