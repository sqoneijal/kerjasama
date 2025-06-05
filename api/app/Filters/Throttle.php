<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class Throttle implements FilterInterface
{
   /**
    * Batasi request dari klien berdasarkan IP + User-Agent
    * Maksimal 60 request per menit (1 request per detik)
    *
    * @param list<string>|null $arguments
    * @return ResponseInterface|void
    */
   public function before(RequestInterface $request, $arguments = null)
   {
      $throttler = service('throttler');

      // Gabungan IP dan User-Agent untuk membuat kunci unik
      $ip        = $request->getIPAddress();
      $userAgent = $request->getUserAgent();
      $key       = md5($ip . $userAgent);

      // Batasi maksimal 60 permintaan per menit
      $limit     = 60;
      $interval  = MINUTE;

      if (! $throttler->check($key, $limit, $interval)) {
         // Logging (opsional)
         log_message('warning', 'Rate limit exceeded for IP: ' . $ip);

         // Respon dengan kode 429 dan header Retry-After
         return service('response')
            ->setStatusCode(429)
            ->setHeader('Retry-After', '60') // detik
            ->setBody('Terlalu banyak permintaan. Silakan coba lagi dalam 1 menit.');
      }
   }

   /**
    * Tidak digunakan dalam filter ini
    *
    * @param list<string>|null $arguments
    * @return void
    */
   public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
   {
      // ...
   }
}
