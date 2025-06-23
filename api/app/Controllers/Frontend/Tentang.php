<?php

namespace App\Controllers\Frontend;

use App\Controllers\BaseController;
use App\Models\Frontend\Tentang as Model;

class Tentang extends BaseController
{

   public function profil()
   {
      $model = new Model();
      $content = $model->getDataProfil();
      return $this->respondCreated($content);
   }

   public function strukturorganisasi()
   {
      $model = new Model();
      $content = $model->getDataStrukturOrganisasi();
      return $this->respondCreated($content);
   }

   public function sekretariat()
   {
      $model = new Model();
      $content = $model->getDataSekretariat();
      return $this->respondCreated($content);
   }
}
