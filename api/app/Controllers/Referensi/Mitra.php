<?php

namespace App\Controllers\Referensi;

use App\Controllers\BaseController;
use App\Models\Referensi\Mitra as Model;
use App\Validation\Referensi\Mitra as Validate;

class Mitra extends BaseController
{

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

   public function getData()
   {
      $model = new Model();
      $content = $model->getData($this->request->getGet());

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
