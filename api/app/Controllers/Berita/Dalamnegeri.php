<?php

namespace App\Controllers\Berita;

use App\Controllers\BaseController;
use App\Models\Berita\DalamNegeri as Model;
use App\Validation\Berita\DalamNegeri as Validate;

class Dalamnegeri extends BaseController
{
   public function getData()
   {
      $model = new Model();
      $content = $model->getData($this->request->getGet());

      return $this->respondCreated($content);
   }

   public function submit()
   {
      if ($this->request->is('post')) {
         $response = ['status' => false, 'errors' => []];

         $validation = new Validate();
         if ($this->validate($validation->submit())) {
            $model = new Model();
            $submit = $model->submit($this->request->getPost());

            $response = array_merge($submit, ['errors' => []]);
         } else {
            $response['message'] = 'Tolong periksa kembali inputan anda!';
            $response['errors'] = \Config\Services::validation()->getErrors();
         }
         return $this->respondCreated($response);
      }
   }

   public function getDropdown()
   {
      $model = new Model();
      $content = $model->getDropdown();
      return $this->respondCreated($content);
   }

   public function hapus()
   {
      if ($this->request->is('post')) {
         $model = new Model();
         $content = $model->hapus($this->request->getPost());
         return $this->respondCreated($content);
      }
   }
}
