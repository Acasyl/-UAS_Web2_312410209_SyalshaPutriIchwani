Nama  :Syalsha Putri Ichwani

NIM   :312410209


# Sistem Informasi Perpustakaan Islam
Sistem Informasi Perpustakaan Islam adalah sebuah aplikasi berbasis web yang dirancang untuk membantu mengelola koleksi kitab-kitab Islam secara digital.
Aplikasi ini memudahkan pengelola perpustakaan dalam melakukan pencatatan, pemantauan, dan pengelolaan data secara terstruktur dan efisien.

Aplikasi ini dibuat untuk menjawab kebutuhan pengelolaan perpustakaan yang masih dilakukan secara manual atau semi-digital.
Dengan adanya sistem ini, proses pengelolaan koleksi buku, data anggota, dan transaksi peminjaman dapat dilakukan dengan lebih cepat, akurat, dan terorganisir.

Berikut adalah skema relasi antar tabel pada database, didesain menggunakan Designer phpMyAdmin:

<img width="927" height="160" alt="image" src="https://github.com/user-attachments/assets/33147981-caa7-469a-bca6-6d01517e45a9" />



Berikut adalah bukti pengujian endpoint API yang dilindungi token, menunjukkan response Error 401 Unauthorized ketika diakses tanpa token yang valid melalui Postman.

<img width="719" height="392" alt="Cuplikan layar 2026-06-19 134336" src="https://github.com/user-attachments/assets/514276cc-fdb3-4685-a30f-da4ff9b992c1" />

Dan ini bukti ketika sudah tidak error

<img width="721" height="457" alt="image" src="https://github.com/user-attachments/assets/8b8c127d-0d96-4af5-b387-ebd6dc8a9e95" />


# 🖥️ Screenshot Antarmuka Aplikasi

# 1. Halaman Login
Halaman login dengan form username dan password. Terdapat informasi default login: `admin` / `admin123`.

<img width="959" height="474" alt="image" src="https://github.com/user-attachments/assets/521118f5-3e49-4c4b-b44e-45e62361e636" />


# 2. Halaman Dashboard Admin
Dashboard menampilkan statistik:
- Total Buku: 10
- Total Anggota: 5
- Peminjaman Aktif: 6
- Total Peminjaman: 10
- Daftar Buku Terbaru

<img width="959" height="477" alt="Cuplikan layar 2026-06-21 001301" src="https://github.com/user-attachments/assets/fe938e3b-65ce-4842-a821-f0434b60e591" />

# 3. Tabel Data dengan TailwindCSS
Ini halaman Manajemen Buku tempat admin mengelola seluruh data koleksi buku/kitab perpustakaan dan Form Modal Tambah/Edit Data untuk menambah buku baru dengan fitur upload foto dan
untuk mengedit data buku yang sudah ada.

<img width="949" height="479" alt="Cuplikan layar 2026-06-21 004548" src="https://github.com/user-attachments/assets/930378e2-fcad-42bd-b087-ee05bb319f29" />

# 5. Halaman Manajemen Lainnya

Tampilan Halaman Manajemen Kategori
Pada halaman ini, ditampilkan data anggota perpustakaan dalam bentuk tabel yang rapi menggunakan TailwindCSS. Setiap baris mewakili satu anggota dengan informasi lengkap yang diperlukan untuk keperluan administrasi perpustakaan.

<img width="950" height="473" alt="Cuplikan layar 2026-06-21 001326" src="https://github.com/user-attachments/assets/0f45e295-330e-4c38-ae5d-df5f0cb39a11" />

<br><br>
Tampilan Halaman Manajemen Peminjaman
Halaman ini menampilkan semua transaksi peminjaman yang terjadi di perpustakaan. Setiap baris data menunjukkan siapa yang meminjam buku apa dan status peminjamannya.


<img width="949" height="476" alt="Cuplikan layar 2026-06-21 001353" src="https://github.com/user-attachments/assets/e53d2698-74ab-4c30-a5b1-a497d21ec02e" />


Tampilan Halaman Manajemen Kategori
Halaman ini menampilkan daftar kategori buku yang tersedia di perpustakaan. Kategori digunakan untuk mengelompokkan buku-buku berdasarkan tema atau bidang ilmunya.

<img width="948" height="472" alt="Cuplikan layar 2026-06-21 001411" src="https://github.com/user-attachments/assets/cd95aec1-8177-41a1-82ee-5629034e4781" />



# Petunjuk Instalasi


1. Menjalankan Backend (CodeIgniter 4)

a. Masuk ke folder backend
cd backend_api


 b. Install dependency
composer install


 c. Copy file env dan sesuaikan konfigurasi database
cp env .env

 d. Buat database baru di MySQL, lalu sesuaikan kredensial di .env, contoh:
 database.default.hostname = localhost
 database.default.database = perpustakaan_islam
 database.default.username = root
 database.default.password =


 e. Jalankan migrasi (jika menggunakan migration) atau import file SQL
php spark migrate
 atau import manual file .sql ke database lewat phpMyAdmin


f. Jalankan server backend
php spark serve --port 8080

Backend akan berjalan di http://localhost:8080.
<br><br>

2. Menjalankan Frontend (Vue 3 SPA)

. Frontend ini berbasis file statis (HTML + JS, tanpa proses build), sehingga cukup dijalankan lewat web server sederhana.

a. Masuk ke folder frontend
bash
cd frontend_spa

b. Buka file app.js dan sesuaikan BASE_URL jika perlu
javascript
const BASE_URL = 'http://localhost:8080/api';

c. Jalankan Frontend
Opsi 1: Menggunakan Live Server (VS Code)

Buka folder frontend-spa di VS Code

Install extension "Live Server"

Klik kanan pada index.html → Open with Live Server


Opsi 2: Menggunakan PHP Built-in Server

bash
php -S localhost:5500


Opsi 3: Menggunakan Python

bash
python -m http.server 5500
Frontend akan berjalan di: http://localhost:5500


d. Login ke Aplikasi
Buka browser dan akses: http://localhost:5500

Credential Login:

Username: admin

Password: admin123


# Link Demo Aplikasi
