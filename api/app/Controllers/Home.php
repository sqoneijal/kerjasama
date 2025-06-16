<?php

namespace App\Controllers;

use App\Models\Common as Model;

class Home extends BaseController
{
   public function index()
   {
      echo 'maintenance';
   }

   public function validateuser()
   {
      $model = new Model();
      $data = $model->validateUser($this->request->getPost());
      return $this->respondCreated($data);
   }
}
