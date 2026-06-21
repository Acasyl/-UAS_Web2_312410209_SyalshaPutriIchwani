<?php
namespace App\Models;

use CodeIgniter\Model;

class BukuModel extends Model
{
    protected $table = 'buku';
    protected $primaryKey = 'id_buku';
    protected $allowedFields = [
        'judul_buku', 
        'penulis', 
        'penerbit', 
        'tahun_terbit', 
        'stok', 
        'id_kategori',
        'foto'
    ];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getBukuWithKategori()
    {
        return $this->select('buku.*, kategori.nama_kategori')
                    ->join('kategori', 'kategori.id_kategori = buku.id_kategori', 'left')
                    ->findAll();
    }
}