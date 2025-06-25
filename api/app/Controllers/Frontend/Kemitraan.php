<?php

namespace App\Controllers\Frontend;

use App\Controllers\BaseController;
use App\Models\Frontend\Kemitraan as Model;

class Kemitraan extends BaseController
{

   public function getData()
   {
      $model = new Model();
      $content = $model->getData();
      return $this->respondCreated($content);
   }
}
