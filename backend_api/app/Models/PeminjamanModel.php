<?php
namespace App\Models;

use CodeIgniter\Model;

class PeminjamanModel extends Model
{
    protected $table = 'peminjaman';
    protected $primaryKey = 'id_pinjam';
    protected $allowedFields = [
        'id_anggota', 
        'id_buku', 
        'tanggal_pinjam', 
        'tanggal_kembali', 
        'status'
    ];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // Get peminjaman with detail
    public function getPeminjamanWithDetail()
    {
        return $this->select('peminjaman.*, anggota.nama as nama_anggota, buku.judul_buku')
                    ->join('anggota', 'anggota.id_anggota = peminjaman.id_anggota')
                    ->join('buku', 'buku.id_buku = peminjaman.id_buku')
                    ->findAll();
    }
}