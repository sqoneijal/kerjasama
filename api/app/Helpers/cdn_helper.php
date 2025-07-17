<?php

use phpseclib3\Net\SFTP;

function cdn_upload($file, $remotePath)
{
   $upload_path = WRITEPATH . 'uploads';
   $getRandomName = $file->getRandomName();
   $file->move($upload_path, $getRandomName);

   $sftp = new SFTP(env('CDN_HOST'));
   if (!$sftp->login(env('CDN_USER'), env('CDN_PASS'))) {
      exit('Login Failed');
   }

   $remoteDir = '/usr/share/nginx/cdn/kerjasama/' . $remotePath;

   if (!$sftp->is_dir($remoteDir)) {
      $sftp->mkdir($remoteDir, -1, true); // true = recursive
   }

   $sftp->put($remoteDir . '/' . $getRandomName, file_get_contents($upload_path . '/' . $getRandomName));

   @unlink($upload_path . '/' . $getRandomName);

   return 'https://cdn.ar-raniry.ac.id/kerjasama/' . $remotePath . '/' . $getRandomName;
}
