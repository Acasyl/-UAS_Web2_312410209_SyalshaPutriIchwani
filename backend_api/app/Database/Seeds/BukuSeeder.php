<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class BukuSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'judul_kitab' => 'Tarikh al-Rusul wa al-Muluk (Tarikh al-Tabari)',
                'genre' => 'Sejarah Umum Islam',
                'penulis' => 'Muhammad ibn Jarir al-Tabari',
                'penerbit' => 'Dar al-Turath',
                'status' => 'Tersedia',
                'stok' => 5
            ],
            [
                'judul_kitab' => 'Al-Kamil fi al-Tarikh',
                'genre' => 'Sejarah Dunia dan Islam',
                'penulis' => 'Ibn al-Athir',
                'penerbit' => 'Dar al-Kutub al-Ilmiyyah',
                'status' => 'Tersedia',
                'stok' => 4
            ],
            [
                'judul_kitab' => 'Al-Bidayah wa al-Nihayah',
                'genre' => 'Sejarah Islam dan Para Nabi',
                'penulis' => 'Ibn Kathir',
                'penerbit' => 'Dar Hajar',
                'status' => 'Tersedia',
                'stok' => 6
            ],
            [
                'judul_kitab' => 'Tarikh Dimashq',
                'genre' => 'Biografi dan Sejarah Kota',
                'penulis' => 'Ibn Asakir',
                'penerbit' => 'Dar al-Fikr',
                'status' => 'Tersedia',
                'stok' => 3
            ],
            [
                'judul_kitab' => "Siyar A'lam al-Nubala'",
                'genre' => 'Biografi Tokoh Islam',
                'penulis' => 'Al-Dhahabi',
                'penerbit' => 'Muassasah al-Risalah',
                'status' => 'Tersedia',
                'stok' => 7
            ],
            [
                'judul_kitab' => 'Al-Muqaddimah',
                'genre' => 'Filsafat Sejarah dan Peradaban',
                'penulis' => 'Ibn Khaldun',
                'penerbit' => 'Dar al-Fikr',
                'status' => 'Dipinjam',
                'stok' => 2
            ],
            [
                'judul_kitab' => 'Kitab al-Ibar',
                'genre' => 'Sejarah Dunia Islam',
                'penulis' => 'Ibn Khaldun',
                'penerbit' => 'Berbagai Penerbit Arab',
                'status' => 'Tersedia',
                'stok' => 4
            ],
            [
                'judul_kitab' => 'Futuh al-Buldan',
                'genre' => 'Sejarah Penaklukan Islam',
                'penulis' => 'Al-Baladhuri',
                'penerbit' => 'Dar wa Maktabat al-Hilal',
                'status' => 'Tersedia',
                'stok' => 3
            ],
            [
                'judul_kitab' => 'Al-Maghazi',
                'genre' => 'Sirah dan Peperangan Nabi',
                'penulis' => 'Al-Waqidi',
                'penerbit' => 'Penerbit Akademik Arab',
                'status' => 'Dipinjam',
                'stok' => 2
            ],
            [
                'judul_kitab' => 'Sirat Rasul Allah',
                'genre' => 'Sirah Nabawiyah',
                'penulis' => 'Ibn Ishaq',
                'penerbit' => 'Edisi Tahqiq Modern',
                'status' => 'Tersedia',
                'stok' => 5
            ]
        ];

        $this->db->table('buku')->insertBatch($data);
    }
}