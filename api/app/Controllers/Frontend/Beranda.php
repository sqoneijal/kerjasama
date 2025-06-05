<?php

namespace App\Controllers\Frontend;

use App\Controllers\BaseController;
use App\Models\Frontend\Beranda as Model;

class Beranda extends BaseController
{
   public function getData()
   {
      $model = new Model();
      $content = $model->getData();
      return $this->respondCreated($content);
   }
}
