<?php
namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Perpustakaan Islam API',
            'version' => '1.0.0',
            'documentation' => 'http://localhost:8080/api',
            'endpoints' => [
                'POST /api/login' => 'Login user',
                'POST /api/register' => 'Register user',
                'GET /api/dashboard' => 'Dashboard stats',
                'GET /api/buku' => 'List buku',
                'POST /api/buku' => 'Tambah buku',
                'PUT /api/buku/{id}' => 'Update buku',
                'DELETE /api/buku/{id}' => 'Hapus buku',
            ]
        ]);
    }
}