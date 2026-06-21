<?php
namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BukuModel;

class BukuController extends BaseController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        $this->model = new BukuModel();
    }

    public function index()
    {
        $data = $this->model->getBukuWithKategori();
        return $this->respond($data, 200);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Buku tidak ditemukan');
        }
        return $this->respond($data, 200);
    }

    public function create()
    {
        $data = $this->request->getPost();
        
        $foto = $this->request->getFile('foto');
        if ($foto && $foto->isValid() && !$foto->hasMoved()) {
            $newName = $foto->getRandomName();
            $foto->move('uploads/buku', $newName);
            $data['foto'] = 'uploads/buku/' . $newName;
        }
        
        if (!$this->model->save($data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respondCreated([
            'message' => 'Buku berhasil ditambahkan', 
            'id' => $this->model->getInsertID()
        ]);
    }

    public function update($id = null)
    {
        $buku = $this->model->find($id);
        if (!$buku) {
            return $this->failNotFound('Buku tidak ditemukan');
        }
        
        // Ambil data dari POST
        $data = $this->request->getPost();
        
        // Debug
        log_message('debug', 'UPDATE - ID: ' . $id);
        log_message('debug', 'UPDATE - POST: ' . json_encode($data));
        log_message('debug', 'UPDATE - FILES: ' . json_encode($_FILES));
        
        // Upload foto
        $foto = $this->request->getFile('foto');
        if ($foto && $foto->isValid() && !$foto->hasMoved()) {
            if ($buku['foto'] && file_exists($buku['foto'])) {
                unlink($buku['foto']);
            }
            
            $newName = $foto->getRandomName();
            $foto->move('uploads/buku', $newName);
            $data['foto'] = 'uploads/buku/' . $newName;
        }
        
        if (empty($data)) {
            return $this->fail('Tidak ada data yang dikirim untuk diupdate');
        }
        
        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respond(['message' => 'Buku berhasil diperbarui']);
    }

    public function delete($id = null)
    {
        $buku = $this->model->find($id);
        if (!$buku) {
            return $this->failNotFound('Buku tidak ditemukan');
        }
        
        if ($buku['foto'] && file_exists($buku['foto'])) {
            unlink($buku['foto']);
        }
        
        $this->model->delete($id);
        return $this->respondDeleted(['message' => 'Buku berhasil dihapus']);
    }
}