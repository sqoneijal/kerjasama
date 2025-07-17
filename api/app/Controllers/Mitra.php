<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Mitra as Model;
use App\Validation\Mitra as Validate;
use Google\Client as Google_Client;
use Google\Service\Drive as Google_Service_Drive;
use Google\Service\Drive\DriveFile as Google_Service_Drive_DriveFile;

class Mitra extends BaseController
{

   public function detail()
   {
      if ($this->request->is('post')) {
         $model = new Model();
         $content = $model->getDetail($this->request->getPost());
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

   public function getData()
   {
      if ($this->request->is('get')) {
         $model = new Model();
         $content = $model->getData($this->request->getGet());

         return $this->respondCreated($content);
      }
   }

   public function dropdown()
   {
      if ($this->request->is('get')) {
         $model = new Model();
         $content = $model->getDropdownData();

         return $this->respondCreated($content);
      }
   }

   public function submit()
   {
      if ($this->request->is('post')) {
         $response = ['status' => false, 'errors' => []];

         $validation = new Validate();
         if ($this->validate($validation->submit($this->request->getPost()))) {
            $post = $this->request->getPost();

            $file_mou = $this->request->getFile('file_mou');
            if ($file_mou) {
               $post['nama_dokumen'] = $file_mou->getClientName();
               $post['dokumen_path'] = cdn_upload($file_mou, url_title($post['id_mitra'], '-', true));
            }

            $model = new Model();
            $submit = $model->submit($post);

            $response = array_merge($submit, ['errors' => []]);
         } else {
            $response['message'] = 'Tolong periksa kembali inputan anda!';
            $response['errors'] = \Config\Services::validation()->getErrors();
         }
         return $this->respond($response);
      }
   }
}
