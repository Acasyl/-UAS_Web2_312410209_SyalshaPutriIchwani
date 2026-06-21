<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BukuModel;
use App\Models\AnggotaModel;
use App\Models\PeminjamanModel;

class DashboardController extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $bukuModel = new BukuModel();
        $anggotaModel = new AnggotaModel();
        $peminjamanModel = new PeminjamanModel();

        $data = [
            'total_buku' => $bukuModel->countAll(),
            'total_anggota' => $anggotaModel->countAll(),
            'total_peminjaman' => $peminjamanModel->countAll(),
            'peminjaman_aktif' => $peminjamanModel->where('status', 'Dipinjam')->countAllResults(),
            'buku_terbaru' => $bukuModel->orderBy('created_at', 'DESC')->limit(5)->findAll()
        ];

        return $this->respond($data, 200);
    }
}