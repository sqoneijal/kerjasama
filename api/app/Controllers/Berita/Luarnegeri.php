<?php

namespace App\Controllers\Berita;

use App\Controllers\BaseController;
use App\Models\Berita\Luarnegeri as Model;
use App\Validation\Berita\Luarnegeri as Validate;

class Luarnegeri extends BaseController
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
            $post = $this->request->getPost();

            $file_thumbnail = $this->request->getFile('file_thumbnail');
            if ($file_thumbnail) {
               $upload_path = WRITEPATH . 'uploads';
               $getRandomName = $file_thumbnail->getRandomName();
               $file_thumbnail->move($upload_path, $getRandomName);
               $clientId = env('IMGURL_CLIENT_ID');
               $imagePath = $upload_path . '/' . $getRandomName;

               $client = service('curlrequest');

               $reqImgur = $client->request('POST', 'https://api.imgur.com/3/image', [
                  'headers' => [
                     'Authorization' => 'Client-ID ' . $clientId,
                  ],
                  'multipart' => [
                     'image' => new \CURLFile($imagePath),
                     'type' => 'image',
                     'title' => $post['judul']
                  ],
               ]);

               $bodyImgur = $reqImgur->getBody();
               $imgur = json_decode($bodyImgur, true);

               if ($imgur['status']) {
                  $post['thumbnail'] = $imgur['data']['link'];
               }
            }

            $model = new Model();
            $submit = $model->submit($post);

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
