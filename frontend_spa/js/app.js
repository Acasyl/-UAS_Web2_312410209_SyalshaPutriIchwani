// ============================================
// KONFIGURASI
// ============================================
const API_URL = 'http://localhost:8080/api';

// ============================================
// HELPERS
// ============================================
function getAuthHeaders(json = true) {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' };
    if (json) headers['Content-Type'] = 'application/json';
    return headers;
}

async function apiFetch(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, options);
    return res;
}

// ============================================
// HOME
// ============================================
const Home = {
    template: `
        <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
            <div class="container mx-auto px-4 py-16">
                <div class="text-center">
                    <div class="text-6xl mb-6">📚</div>
                    <h1 class="text-5xl font-bold text-emerald-800 mb-4">Perpustakaan Islam</h1>
                    <p class="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                        Selamat datang di sistem manajemen perpustakaan Islam.
                        Kelola koleksi kitab-kitab Islam dengan mudah dan efisien.
                    </p>
                    <router-link
                        to="/login"
                        class="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    >
                        <i class="fas fa-sign-in-alt mr-2"></i>Masuk ke Dashboard
                    </router-link>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div class="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                        <div class="text-4xl mb-4">📖</div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Koleksi Lengkap</h3>
                        <p class="text-gray-600">Berbagai kitab Islam dari berbagai genre dan penulis terkenal</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                        <div class="text-4xl mb-4">🔍</div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Mudah Dicari</h3>
                        <p class="text-gray-600">Sistem pencarian yang cepat dan akurat untuk menemukan buku</p>
                    </div>
                    <div class="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                        <div class="text-4xl mb-4">📊</div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Manajemen Efisien</h3>
                        <p class="text-gray-600">Kelola peminjaman dan stok buku dengan mudah</p>
                    </div>
                </div>
            </div>
        </div>
    `
};

// ============================================
// LOGIN
// ============================================
const Login = {
    template: `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
            <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div class="text-center mb-8">
                    <div class="text-5xl mb-3">📚</div>
                    <h1 class="text-3xl font-bold text-emerald-800">Perpustakaan Islam</h1>
                    <p class="text-gray-600 mt-2">Silakan login untuk melanjutkan</p>
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            <i class="fas fa-user mr-2"></i>Username
                        </label>
                        <input
                            v-model="username"
                            type="text"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                            placeholder="Masukkan username"
                            required
                            autofocus
                        >
                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            <i class="fas fa-lock mr-2"></i>Password
                        </label>
                        <input
                            v-model="password"
                            type="password"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                            placeholder="Masukkan password"
                            required
                        >
                    </div>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                    >
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        {{ loading ? 'Memproses...' : 'Login' }}
                    </button>
                </form>

                <p v-if="error" class="mt-4 text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg">
                    <i class="fas fa-exclamation-circle mr-2"></i>{{ error }}
                </p>

                <div class="mt-4 text-center text-sm text-gray-500">
                    <p>Username: <strong>admin</strong> | Password: <strong>admin123</strong></p>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            username: '',
            password: '',
            loading: false,
            error: ''
        };
    },

    methods: {
        async handleLogin() {
            this.loading = true;
            this.error = '';

            try {
                const res = await apiFetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify({ username: this.username, password: this.password })
                });

                const data = await res.json();

                if (res.ok && data.status === 'success') {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', JSON.stringify(data.user));
                    if (this.$root) this.$root.isLoggedIn = true;
                    this.$router.push('/dashboard');
                } else {
                    this.error = data.message || data.messages?.error || 'Login gagal';
                }
            } catch {
                this.error = 'Gagal terhubung ke server. Pastikan backend berjalan.';
            } finally {
                this.loading = false;
            }
        }
    }
};

// ============================================
// DASHBOARD
// ============================================
const Dashboard = {
    template: `
        <div class="p-6 bg-gray-50 min-h-screen">
            <div class="max-w-7xl mx-auto">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-chart-pie mr-3 text-emerald-600"></i>Dashboard
                    </h1>
                    <div class="text-sm text-gray-500">
                        Selamat datang, {{ user?.username || 'Admin' }}
                    </div>
                </div>

                <!-- Stat Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">Total Buku</p>
                                <p class="text-2xl font-bold">{{ stats.total_buku || 0 }}</p>
                            </div>
                            <div class="bg-emerald-100 p-3 rounded-full">
                                <i class="fas fa-book text-emerald-600 text-xl"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">Total Anggota</p>
                                <p class="text-2xl font-bold">{{ stats.total_anggota || 0 }}</p>
                            </div>
                            <div class="bg-blue-100 p-3 rounded-full">
                                <i class="fas fa-users text-blue-600 text-xl"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">Peminjaman Aktif</p>
                                <p class="text-2xl font-bold">{{ stats.peminjaman_aktif || 0 }}</p>
                            </div>
                            <div class="bg-yellow-100 p-3 rounded-full">
                                <i class="fas fa-clock text-yellow-600 text-xl"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-500 text-sm">Total Peminjaman</p>
                                <p class="text-2xl font-bold">{{ stats.total_peminjaman || 0 }}</p>
                            </div>
                            <div class="bg-purple-100 p-3 rounded-full">
                                <i class="fas fa-hand-holding text-purple-600 text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Books -->
                <div class="bg-white rounded-xl shadow-md p-6">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">
                        <i class="fas fa-clock mr-2 text-emerald-600"></i>Buku Terbaru
                    </h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penulis</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stok</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="buku in stats.buku_terbaru" :key="buku.id_buku">
                                    <td class="px-6 py-4 text-sm font-medium">{{ buku.judul_buku }}</td>
                                    <td class="px-6 py-4 text-sm">{{ buku.penulis }}</td>
                                    <td class="px-6 py-4 text-sm">{{ buku.nama_kategori || '-' }}</td>
                                    <td class="px-6 py-4 text-sm">{{ buku.stok }}</td>
                                </tr>
                                <tr v-if="!stats.buku_terbaru?.length">
                                    <td colspan="4" class="px-6 py-8 text-center text-gray-500">Belum ada data buku</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            stats: {
                total_buku: 0,
                total_anggota: 0,
                total_peminjaman: 0,
                peminjaman_aktif: 0,
                buku_terbaru: []
            },
            user: null
        };
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                const userData = localStorage.getItem('user');
                if (userData) this.user = JSON.parse(userData);

                const res = await apiFetch('/dashboard', { headers: getAuthHeaders() });
                if (res.ok) this.stats = await res.json();
            } catch (err) {
                console.error('Dashboard fetch error:', err);
            }
        }
    }
};

// ============================================
// BUKU
// ============================================
const BLANK_FORM = () => ({
    id_buku: null,
    judul_buku: '',
    penulis: '',
    penerbit: '',
    tahun_terbit: null,
    stok: 0,
    id_kategori: null,
    foto: null,
    foto_preview: null,
    foto_lama: null
});

const Buku = {
    template: `
        <div class="p-6 bg-gray-50 min-h-screen">
            <div class="max-w-7xl mx-auto">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-book mr-3 text-emerald-600"></i>Manajemen Buku
                    </h1>
                    <button @click="openModal" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition duration-200">
                        <i class="fas fa-plus mr-2"></i>Tambah Buku
                    </button>
                </div>

                <!-- Search -->
                <div class="bg-white rounded-xl shadow-md p-4 mb-6">
                    <div class="flex gap-4">
                        <div class="flex-1 relative">
                            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                v-model="searchQuery"
                                type="text"
                                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
                                placeholder="Cari judul atau penulis..."
                            >
                        </div>
                        <button @click="searchQuery = ''" class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition duration-200">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <!-- Table -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-emerald-600 text-white">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Foto</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Judul</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Penulis</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Penerbit</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Kategori</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Stok</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="buku in filteredBuku" :key="buku.id_buku" class="hover:bg-gray-50 transition duration-150">
                                    <td class="px-6 py-4">
                                        <img
                                            v-if="buku.foto"
                                            :src="'http://localhost:8080/' + buku.foto"
                                            class="w-12 h-12 object-cover rounded"
                                            alt="Foto Buku"
                                            @error="handleImageError"
                                        >
                                        <div v-else class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                            <i class="fas fa-image text-xl"></i>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-600">{{ buku.id_buku }}</td>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ buku.judul_buku }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-600">{{ buku.penulis }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-600">{{ buku.penerbit }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-600">
                                        <span class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                                            {{ buku.nama_kategori || '-' }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-600">{{ buku.stok }}</td>
                                    <td class="px-6 py-4">
                                        <button @click="editBuku(buku)" class="text-blue-600 hover:text-blue-800 mr-3 transition duration-200">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button @click="deleteBuku(buku.id_buku)" class="text-red-600 hover:text-red-800 transition duration-200">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="!filteredBuku.length">
                                    <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                                        <i class="fas fa-inbox text-4xl block mb-2"></i>
                                        Tidak ada data buku
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Modal -->
                <div
                    v-if="showModal"
                    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    @click.self="closeModal"
                >
                    <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-gray-800">
                                <i :class="isEdit ? 'fas fa-edit text-blue-600' : 'fas fa-plus-circle text-emerald-600'" class="mr-2"></i>
                                {{ isEdit ? 'Edit Buku' : 'Tambah Buku' }}
                            </h2>
                            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition duration-200">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <form @submit.prevent="saveBuku">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Judul Buku</label>
                                <input v-model="form.judul_buku" type="text" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200">
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Penulis</label>
                                <input v-model="form.penulis" type="text" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200">
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Penerbit</label>
                                <input v-model="form.penerbit" type="text"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200">
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Tahun Terbit</label>
                                <input v-model.number="form.tahun_terbit" type="number" min="1000" max="2099"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200">
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                                <select v-model="form.id_kategori"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200">
                                    <option :value="null">Pilih Kategori</option>
                                    <option v-for="kat in daftarKategori" :key="kat.id_kategori" :value="kat.id_kategori">
                                        {{ kat.nama_kategori }}
                                    </option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">
                                    <i class="fas fa-image mr-2"></i>Foto Buku
                                </label>
                                <input type="file" @change="handleFileUpload" accept="image/*"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200">
                                <div v-if="form.foto_preview" class="mt-2">
                                    <img :src="form.foto_preview" class="w-24 h-24 object-cover rounded border">
                                    <p class="text-xs text-gray-500 mt-1">Preview foto</p>
                                </div>
                                <div v-else-if="isEdit && form.foto_lama" class="mt-2">
                                    <img :src="'http://localhost:8080/' + form.foto_lama" class="w-24 h-24 object-cover rounded border">
                                    <p class="text-xs text-gray-500 mt-1">Foto saat ini</p>
                                </div>
                            </div>

                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Stok</label>
                                <input v-model.number="form.stok" type="number" min="0" required
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200">
                            </div>

                            <div class="flex gap-3">
                                <button type="submit" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg transition duration-200">
                                    {{ isEdit ? 'Update' : 'Simpan' }}
                                </button>
                                <button type="button" @click="closeModal" class="flex-1 bg-gray-300 hover:bg-gray-400 py-2 rounded-lg transition duration-200">
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,

    data() {
        return {
            daftarBuku: [],
            daftarKategori: [],
            searchQuery: '',
            showModal: false,
            isEdit: false,
            form: BLANK_FORM()
        };
    },

    computed: {
        filteredBuku() {
            if (!this.searchQuery) return this.daftarBuku;
            const q = this.searchQuery.toLowerCase();
            return this.daftarBuku.filter(b =>
                b.judul_buku.toLowerCase().includes(q) ||
                b.penulis.toLowerCase().includes(q)
            );
        }
    },

    mounted() {
        this.fetchBuku();
        this.fetchKategori();
    },

    methods: {
        async fetchBuku() {
            try {
                const res = await apiFetch('/buku', { headers: getAuthHeaders() });
                if (res.ok) this.daftarBuku = await res.json();
            } catch (err) {
                console.error('Fetch buku error:', err);
            }
        },

        async fetchKategori() {
            try {
                const res = await apiFetch('/kategori', { headers: getAuthHeaders() });
                if (res.ok) this.daftarKategori = await res.json();
            } catch (err) {
                console.error('Fetch kategori error:', err);
            }
        },

        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            this.form.foto = file;
            const reader = new FileReader();
            reader.onload = e => { this.form.foto_preview = e.target.result; };
            reader.readAsDataURL(file);
        },

        // Menggunakan DOM langsung agar tidak memicu re-render tabel
        handleImageError(event) {
            const img = event.target;
            img.style.display = 'none';
            if (!img.dataset.fallbackAdded) {
                img.dataset.fallbackAdded = 'true';
                const fallback = document.createElement('div');
                fallback.className = 'w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400';
                fallback.innerHTML = '<i class="fas fa-image text-xl"></i>';
                img.parentNode.appendChild(fallback);
            }
        },

        openModal() {
            this.isEdit = false;
            this.form = BLANK_FORM();
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
            this.form = BLANK_FORM();
        },

        editBuku(b) {
            this.isEdit = true;
            this.form = {
                id_buku: b.id_buku,
                judul_buku: b.judul_buku,
                penulis: b.penulis,
                penerbit: b.penerbit,
                tahun_terbit: b.tahun_terbit,
                stok: b.stok,
                id_kategori: b.id_kategori,
                foto: null,
                foto_preview: null,
                foto_lama: b.foto || null
            };
            this.showModal = true;
        },

        async saveBuku() {
            try {
                const url = this.isEdit ? `/buku/${this.form.id_buku}` : '/buku';
                const formData = new FormData();

                formData.append('judul_buku', this.form.judul_buku);
                formData.append('penulis', this.form.penulis);
                formData.append('penerbit', this.form.penerbit);
                formData.append('stok', this.form.stok);
                if (this.form.tahun_terbit) formData.append('tahun_terbit', this.form.tahun_terbit);
                if (this.form.id_kategori) formData.append('id_kategori', this.form.id_kategori);
                if (this.form.foto) formData.append('foto', this.form.foto);

                const res = await apiFetch(url, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    body: formData
                });

                let data;
                try {
                    data = JSON.parse(await res.text());
                } catch {
                    alert('Server mengembalikan respons tidak valid. Cek console (F12) untuk detail.');
                    return;
                }

                if (res.ok) {
                    await this.fetchBuku();
                    this.closeModal();
                    alert(this.isEdit ? 'Buku berhasil diupdate!' : 'Buku berhasil ditambahkan!');
                } else {
                    alert(data.message || 'Gagal menyimpan data');
                }
            } catch (err) {
                console.error('Save buku error:', err);
                alert('Gagal menyimpan data');
            }
        },

        async deleteBuku(id) {
            if (!confirm('Apakah Anda yakin ingin menghapus buku ini?')) return;
            try {
                const res = await apiFetch(`/buku/${id}`, {
                    method: 'DELETE',
                    headers: getAuthHeaders()
                });
                if (res.ok) {
                    await this.fetchBuku();
                    alert('Buku berhasil dihapus!');
                }
            } catch (err) {
                console.error('Delete buku error:', err);
                alert('Gagal menghapus data');
            }
        }
    }
};

// ============================================
// ANGGOTA
// ============================================
const Anggota = {
    template: `
        <div class="p-6 bg-gray-50 min-h-screen">
            <div class="max-w-7xl mx-auto">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">
                    <i class="fas fa-users mr-3 text-emerald-600"></i>Manajemen Anggota
                </h1>
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-emerald-600 text-white">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Nama</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Alamat</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">No HP</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="anggota in daftarAnggota" :key="anggota.id_anggota">
                                    <td class="px-6 py-4 text-sm">{{ anggota.id_anggota }}</td>
                                    <td class="px-6 py-4 text-sm font-medium">{{ anggota.nama }}</td>
                                    <td class="px-6 py-4 text-sm">{{ anggota.alamat || '-' }}</td>
                                    <td class="px-6 py-4 text-sm">{{ anggota.no_hp || '-' }}</td>
                                </tr>
                                <tr v-if="!daftarAnggota.length">
                                    <td colspan="4" class="px-6 py-8 text-center text-gray-500">Belum ada data anggota</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,

    data() {
        return { daftarAnggota: [] };
    },

    mounted() {
        this.fetchAnggota();
    },

    methods: {
        async fetchAnggota() {
            try {
                const res = await apiFetch('/anggota', { headers: getAuthHeaders() });
                if (res.ok) this.daftarAnggota = await res.json();
            } catch (err) {
                console.error('Fetch anggota error:', err);
            }
        }
    }
};

// ============================================
// KATEGORI
// ============================================
const Kategori = {
    template: `
        <div class="p-6 bg-gray-50 min-h-screen">
            <div class="max-w-7xl mx-auto">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">
                    <i class="fas fa-tags mr-3 text-emerald-600"></i>Manajemen Kategori
                </h1>
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-emerald-600 text-white">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Nama Kategori</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="kat in daftarKategori" :key="kat.id_kategori">
                                    <td class="px-6 py-4 text-sm">{{ kat.id_kategori }}</td>
                                    <td class="px-6 py-4 text-sm font-medium">{{ kat.nama_kategori }}</td>
                                </tr>
                                <tr v-if="!daftarKategori.length">
                                    <td colspan="2" class="px-6 py-8 text-center text-gray-500">Belum ada data kategori</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,

    data() {
        return { daftarKategori: [] };
    },

    mounted() {
        this.fetchKategori();
    },

    methods: {
        async fetchKategori() {
            try {
                const res = await apiFetch('/kategori', { headers: getAuthHeaders() });
                if (res.ok) this.daftarKategori = await res.json();
            } catch (err) {
                console.error('Fetch kategori error:', err);
            }
        }
    }
};

// ============================================
// PEMINJAMAN
// ============================================
const Peminjaman = {
    template: `
        <div class="p-6 bg-gray-50 min-h-screen">
            <div class="max-w-7xl mx-auto">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">
                    <i class="fas fa-hand-holding mr-3 text-emerald-600"></i>Manajemen Peminjaman
                </h1>
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-emerald-600 text-white">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">ID</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Anggota</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Buku</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr v-for="pinjam in daftarPeminjaman" :key="pinjam.id_pinjam">
                                    <td class="px-6 py-4 text-sm">{{ pinjam.id_pinjam }}</td>
                                    <td class="px-6 py-4 text-sm font-medium">{{ pinjam.nama_anggota }}</td>
                                    <td class="px-6 py-4 text-sm">{{ pinjam.judul_buku }}</td>
                                    <td class="px-6 py-4">
                                        <span
                                            class="px-3 py-1 rounded-full text-xs font-semibold"
                                            :class="pinjam.status === 'Dipinjam' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'"
                                        >
                                            {{ pinjam.status }}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="!daftarPeminjaman.length">
                                    <td colspan="4" class="px-6 py-8 text-center text-gray-500">Belum ada data peminjaman</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `,

    data() {
        return { daftarPeminjaman: [] };
    },

    mounted() {
        this.fetchPeminjaman();
    },

    methods: {
        async fetchPeminjaman() {
            try {
                const res = await apiFetch('/peminjaman', { headers: getAuthHeaders() });
                if (res.ok) this.daftarPeminjaman = await res.json();
            } catch (err) {
                console.error('Fetch peminjaman error:', err);
            }
        }
    }
};

// ============================================
// ROUTER
// ============================================
const routes = [
    { path: '/',           component: Home,       name: 'Home' },
    { path: '/login',      component: Login,      name: 'Login' },
    { path: '/dashboard',  component: Dashboard,  name: 'Dashboard',  meta: { requiresAuth: true } },
    { path: '/buku',       component: Buku,       name: 'Buku',       meta: { requiresAuth: true } },
    { path: '/anggota',    component: Anggota,    name: 'Anggota',    meta: { requiresAuth: true } },
    { path: '/kategori',   component: Kategori,   name: 'Kategori',   meta: { requiresAuth: true } },
    { path: '/peminjaman', component: Peminjaman, name: 'Peminjaman', meta: { requiresAuth: true } }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (to.meta.requiresAuth && !loggedIn) return next('/login');
    if (loggedIn && to.path === '/login') return next('/dashboard');
    next();
});

// ============================================
// APP ROOT
// ============================================
const App = {
    template: `
        <div>
            <nav v-if="isLoggedIn" class="bg-emerald-800 shadow-lg">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <router-link to="/dashboard" class="text-white text-xl font-bold flex items-center">
                                <span class="text-2xl mr-2">📚</span>Perpustakaan Islam
                            </router-link>
                        </div>
                        <div class="flex items-center space-x-1 sm:space-x-4">
                            <router-link to="/dashboard"  class="text-white hover:bg-emerald-700 px-3 py-2 rounded-md text-sm font-medium"><i class="fas fa-chart-pie mr-1"></i>Dashboard</router-link>
                            <router-link to="/buku"       class="text-white hover:bg-emerald-700 px-3 py-2 rounded-md text-sm font-medium"><i class="fas fa-book mr-1"></i>Buku</router-link>
                            <router-link to="/anggota"    class="text-white hover:bg-emerald-700 px-3 py-2 rounded-md text-sm font-medium"><i class="fas fa-users mr-1"></i>Anggota</router-link>
                            <router-link to="/peminjaman" class="text-white hover:bg-emerald-700 px-3 py-2 rounded-md text-sm font-medium"><i class="fas fa-hand-holding mr-1"></i>Peminjaman</router-link>
                            <router-link to="/kategori"   class="text-white hover:bg-emerald-700 px-3 py-2 rounded-md text-sm font-medium"><i class="fas fa-tags mr-1"></i>Kategori</router-link>
                            <button @click="logout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                <i class="fas fa-sign-out-alt mr-1"></i>Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    `,

    data() {
        return {
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
        };
    },

    mounted() {
        window.addEventListener('storage', () => {
            this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        });
    },

    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            this.$router.push('/login');
        }
    }
};

// ============================================
// MOUNT
// ============================================
const app = Vue.createApp(App);
app.use(router);
app.mount('#app');

console.log('✅ Aplikasi berhasil dijalankan!');
console.log('🔑 Login: admin / admin123');
console.log('📡 Backend:', API_URL);