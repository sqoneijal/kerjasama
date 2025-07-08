<?php

namespace App\Controllers\Referensi;

use App\Controllers\BaseController;
use App\Validation\Referensi\Tindaklanjut as Validate;
use App\Models\Referensi\Tindaklanjut as Model;

class Tindaklanjut extends BaseController
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
         return $this->respond($response);
      }
   }

   public function getData()
   {
      if ($this->request->is('get')) {
         $model = new Model();
         $content = $model->getData();
         return $this->respondCreated($content);
      }
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
