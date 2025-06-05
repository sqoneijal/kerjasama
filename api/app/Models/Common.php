<?php

namespace App\Models;

use CodeIgniter\Model;
use Firebase\JWT\JWT;

class Common extends Model
{
    protected $db;

    public function __construct()
    {
        parent::__construct();

        $this->db = \Config\Database::connect('default');
    }

    public function generateJWT(array $data): string
    {
        return JWT::encode($data, 'kerjasama', 'HS256');
    }
}
