<?php

namespace App\Controllers\Frontend;

use App\Controllers\BaseController;
use App\Models\Frontend\Berita as Model;

class Berita extends BaseController
{
   public function read(string $slug)
   {
      $model = new Model();
      $content = $model->getDetailBerita($slug);
      return $this->respondCreated($content);
   }

   public function getData()
   {
      $model = new Model();
      $content = $model->getData($this->request->getGet());
      return $this->respondCreated($content);
   }
}
