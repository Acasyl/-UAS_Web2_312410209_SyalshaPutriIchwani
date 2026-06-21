<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\PeminjamanModel;
use App\Models\BukuModel;

class PeminjamanController extends ResourceController
{
    use ResponseTrait;

    protected $model;
    protected $bukuModel;
    protected $format = 'json';

    public function __construct()
    {
        $this->model = new PeminjamanModel();
        $this->bukuModel = new BukuModel();
    }

    // GET /api/peminjaman
    public function index()
    {
        $data = $this->model->getPeminjamanWithDetail();
        return $this->respond($data, 200);
    }

    // GET /api/peminjaman/{id}
    public function show($id = null)
    {
        $data = $this->model
            ->select('peminjaman.*, anggota.nama as nama_anggota, buku.judul_buku')
            ->join('anggota', 'anggota.id_anggota = peminjaman.id_anggota')
            ->join('buku', 'buku.id_buku = peminjaman.id_buku')
            ->find($id);
        if (!$data) {
            return $this->failNotFound('Peminjaman tidak ditemukan');
        }
        return $this->respond($data, 200);
    }

    // POST /api/peminjaman
    public function create()
    {
        $data = $this->request->getJSON(true);
        
        // Kurangi stok buku
        $buku = $this->bukuModel->find($data['id_buku']);
        if ($buku && $buku['stok'] > 0) {
            $this->bukuModel->update($data['id_buku'], ['stok' => $buku['stok'] - 1]);
        } else {
            return $this->fail('Stok buku tidak mencukupi');
        }

        if (!$this->model->save($data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respondCreated([
            'message' => 'Peminjaman berhasil ditambahkan',
            'id' => $this->model->getInsertID()
        ]);
    }

    // PUT /api/peminjaman/{id}
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        $peminjaman = $this->model->find($id);
        if (!$peminjaman) {
            return $this->failNotFound('Peminjaman tidak ditemukan');
        }
        
        // Jika status dikembalikan, tambah stok buku
        if (isset($data['status']) && $data['status'] === 'Dikembalikan' && $peminjaman['status'] !== 'Dikembalikan') {
            $buku = $this->bukuModel->find($peminjaman['id_buku']);
            if ($buku) {
                $this->bukuModel->update($peminjaman['id_buku'], ['stok' => $buku['stok'] + 1]);
            }
        }

        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respond(['message' => 'Peminjaman berhasil diperbarui']);
    }

    // DELETE /api/peminjaman/{id}
    public function delete($id = null)
    {
        $peminjaman = $this->model->find($id);
        if (!$peminjaman) {
            return $this->failNotFound('Peminjaman tidak ditemukan');
        }
        
        // Jika status masih Dipinjam, kembalikan stok
        if ($peminjaman['status'] === 'Dipinjam') {
            $buku = $this->bukuModel->find($peminjaman['id_buku']);
            if ($buku) {
                $this->bukuModel->update($peminjaman['id_buku'], ['stok' => $buku['stok'] + 1]);
            }
        }
        
        $this->model->delete($id);
        return $this->respondDeleted(['message' => 'Peminjaman berhasil dihapus']);
    }
}