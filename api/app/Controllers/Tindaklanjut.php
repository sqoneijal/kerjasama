<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Tindaklanjut as Model;
use App\Validation\Tindaklanjut as Validate;

class Tindaklanjut extends BaseController
{
   public function getDropdown()
   {
      $model = new Model();
      $content = $model->getDropdown();
      return $this->respondCreated($content);
   }

   public function submit()
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $model = new Model();
         $submit = $model->submit($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['message'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }
}
