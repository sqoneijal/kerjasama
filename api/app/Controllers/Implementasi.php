<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Implementasi as Model;
use App\Validation\Implementasi as Validate;

class Implementasi extends BaseController
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
         $post = [];
         $dokumen = $this->request->getFile('dokumen');
         if ($dokumen) {
            $post['nama_dokumen'] = $dokumen->getClientName();
            $post['path_dokumen'] = cdn_upload($dokumen, 'tindaklanjut');
         }

         $model = new Model();
         $submit = $model->submit(array_merge($this->request->getPost(), $post));

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['message'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function getData()
   {
      $model = new Model();
      $content = $model->getData($this->request->getGet());
      return $this->respondCreated($content);
   }

   public function hapus()
   {
      $model = new Model();
      $content = $model->hapus($this->request->getPost());
      return $this->respondCreated($content);
   }
}
