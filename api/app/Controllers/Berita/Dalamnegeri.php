<?php

namespace App\Controllers\Berita;

use App\Controllers\BaseController;
use App\Models\Berita\DalamNegeri as Model;

class Dalamnegeri extends BaseController
{
   public function getData()
   {
      if ($this->request->is('get')) {
         $model = new Model();
         $content = $model->getData($this->request->getGet());

         return $this->respondCreated($content);
      }
   }
}
