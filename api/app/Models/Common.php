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

        $this->db = \Config\Database::connect();
    }

    public function validateUser(array $post): bool
    {
        $table = $this->db->table('tb_users');
        $table->where('username', (string) $post['username']);

        $count = $table->countAllResults();

        return $count > 0 ? true : false;
    }

    public function generateJWT(array $data): string
    {
        return JWT::encode($data, 'kerjasama', 'HS256');
    }

    public function getDaftarBidangKerjasama(): array
    {
        $table = $this->db->table('tb_mst_bidang_kerjasama');
        $table->select('id as value, nama as label');
        $table->orderBy('nama');

        $get = $table->get();
        $result = $get->getResultArray();
        $fieldNames = $get->getFieldNames();
        $get->freeResult();

        $response = [];
        foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
                $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
        }
        return $response;
    }

    public function getDaftarFakutlas(): array
    {
        $table = $this->db->table('tb_mst_fakultas');
        $table->select('id as value, nama as label');
        $table->orderBy('nama');

        $get = $table->get();
        $result = $get->getResultArray();
        $fieldNames = $get->getFieldNames();
        $get->freeResult();

        $response = [];
        foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
                $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
        }
        return $response;
    }

    public function getDaftarProdi(): array
    {
        $table = $this->db->table('tb_mst_prodi');
        $table->select('id as value, jenjang || \' - \' || nama as label');
        $table->orderBy('jenjang, nama');

        $get = $table->get();
        $result = $get->getResultArray();
        $fieldNames = $get->getFieldNames();
        $get->freeResult();

        $response = [];
        foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
                $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
        }
        return $response;
    }
}
