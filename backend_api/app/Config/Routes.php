<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// ===== HAPUS ATAU COMMENT INI =====
// $routes->get('/', function() {
//     return redirect()->to('http://localhost:5500');
// });

// // ===== GANTI DENGAN INI =====
// $routes->get('/', function() {
//     return service('response')
//         ->setJSON([
//             'message' => 'Perpustakaan Islam API',
//             'version' => '1.0.0',
//             'endpoints' => [
//                 'login' => '/api/login (POST)',
//                 'register' => '/api/register (POST)',
//                 'dashboard' => '/api/dashboard (GET)',
//                 'buku' => '/api/buku (GET, POST, PUT, DELETE)',
//                 'anggota' => '/api/anggota (GET, POST, PUT, DELETE)',
//                 'peminjaman' => '/api/peminjaman (GET, POST, PUT, DELETE)',
//                 'kategori' => '/api/kategori (GET, POST, PUT, DELETE)',
//             ]
//         ]);
// });

$routes->get('/', 'Home::index');

$routes->options('(:any)', function() {
    return service('response')
        ->setStatusCode(200)
        ->setHeader('Access-Control-Allow-Origin', '*')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin')
        ->setHeader('Access-Control-Allow-Credentials', 'true');
});

// API Routes
$routes->group('api', ['filter' => 'cors'], function($routes) {
    $routes->post('login', 'Api\AuthController::login');
    $routes->post('register', 'Api\AuthController::register');

    $routes->group('', ['filter' => 'auth'], function($routes) {
        $routes->get('dashboard', 'Api\DashboardController::index');
        
        // ===== BUKU ROUTES =====
        $routes->get('buku', 'Api\BukuController::index');
        $routes->get('buku/(:num)', 'Api\BukuController::show/$1');
        $routes->post('buku', 'Api\BukuController::create');
        $routes->post('buku/(:num)', 'Api\BukuController::update/$1');
        $routes->delete('buku/(:num)', 'Api\BukuController::delete/$1');
        
        $routes->resource('anggota', ['controller' => 'Api\AnggotaController']);
        $routes->resource('peminjaman', ['controller' => 'Api\PeminjamanController']);
        $routes->resource('kategori', ['controller' => 'Api\KategoriController']);
        
        $routes->post('logout', 'Api\AuthController::logout');
    });
});