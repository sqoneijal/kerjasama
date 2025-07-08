<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Implementasi as Model;
use App\Validation\Implementasi as Validate;
use Google\Client as Google_Client;
use Google\Service\Drive as Google_Service_Drive;
use Google\Service\Drive\DriveFile as Google_Service_Drive_DriveFile;

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
            $driveUpload = $this->handleUploadToGoogleDrive($dokumen, 'tindaklanjut');
            if ($driveUpload) {
               $post['id_dokumen'] = $driveUpload->id;
               $post['nama_dokumen'] = $dokumen->getClientName();
               $post['path_dokumen'] = 'https://drive.google.com/file/d/' . $driveUpload->id . '/view';
            }
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

   private function handleUploadToGoogleDrive($file, $namaFolder)
   {
      $upload_path = WRITEPATH . 'uploads';
      $getRandomName = $file->getRandomName();
      $file->move($upload_path, $getRandomName);

      $parentId = '11ZMJOvtfH27rsdmZFpuSeixB9c1mxzve';

      $client = new Google_Client();
      $client->setAuthConfig(WRITEPATH . 'google-service.json');
      $client->addScope(Google_Service_Drive::DRIVE);

      $driveService = new Google_Service_Drive($client);

      $driveFile = new Google_Service_Drive_DriveFile();
      $endPointFolder = $this->cariFolderGoogleDrive($driveService, $namaFolder, $parentId);

      if ($endPointFolder === null) {
         $endPointFolder = $this->buatFolderGoogleDrive($driveService, $namaFolder, $parentId);
      }

      $driveFile->setName($file->getClientName());
      $driveFile->setParents([$endPointFolder]);

      $submitUpload = $driveService->files->create($driveFile, array(
         'data' => file_get_contents($upload_path . '/' . $getRandomName),
         'mimeType' => $file->getClientMimeType(),
         'uploadType' => 'multipart'
      ));

      @unlink($upload_path . '/' . $getRandomName);

      return $submitUpload;
   }

   private function cariFolderGoogleDrive($service, $folderName, $parentId = null)
   {
      $query = "name = '$folderName' and mimeType = 'application/vnd.google-apps.folder' and trashed = false";

      if ($parentId) {
         $query .= " and '$parentId' in parents";
      }

      $response = $service->files->listFiles(array(
         'q' => $query,
         'spaces' => 'drive',
         'fields' => 'files(id, name)'
      ));

      if (count($response->files) > 0) {
         return $response->files[0]->id;
      } else {
         return null;
      }
   }

   private function buatFolderGoogleDrive($service, $folderName, $parentId = null)
   {
      $fileMetadata = new Google_Service_Drive_DriveFile(array(
         'name' => $folderName,
         'mimeType' => 'application/vnd.google-apps.folder'
      ));

      if ($parentId) {
         $fileMetadata->setParents(array($parentId));
      }

      $folder = $service->files->create($fileMetadata, array(
         'fields' => 'id'
      ));

      return $folder->id;
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
