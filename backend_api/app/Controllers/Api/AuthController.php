<?php
namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class AuthController extends BaseController
{
    use ResponseTrait;

    public function login()
    {
        // Ambil data dari request
        $data = $this->request->getJSON(true);
        
        // Debug
        log_message('debug', 'Login data: ' . json_encode($data));
        
        if (empty($data['username']) || empty($data['password'])) {
            return $this->fail('Username dan password wajib diisi');
        }

        $model = new UserModel();
        $user = $model->where('username', $data['username'])->first();

        if (!$user) {
            return $this->failUnauthorized('Username tidak ditemukan');
        }

        // Cek password (plain text)
        if ($data['password'] !== $user['password']) {
            return $this->failUnauthorized('Password salah');
        }

        // Generate token
        $token = bin2hex(random_bytes(32));
        $model->update($user['id'], ['token' => $token]);

        return $this->respond([
            'status' => 'success',
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'email' => $user['email']
            ]
        ]);
    }
}