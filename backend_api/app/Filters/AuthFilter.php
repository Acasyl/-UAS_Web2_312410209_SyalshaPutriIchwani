<?php
namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use App\Models\UserModel;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Ambil header Authorization
        $authHeader = $request->getHeaderLine('Authorization');
        
        if (!$authHeader) {
            return service('response')
                ->setJSON(['message' => 'Token tidak ditemukan. Silakan login terlebih dahulu.'])
                ->setStatusCode(401);
        }

        try {
            // Ambil token dari header
            $token = explode(' ', $authHeader)[1] ?? null;
            
            if (!$token) {
                return service('response')
                    ->setJSON(['message' => 'Format token tidak valid. Gunakan: Bearer <token>'])
                    ->setStatusCode(401);
            }

            // Cek token di database
            $model = new UserModel();
            $user = $model->where('token', $token)->first();
            
            if (!$user) {
                return service('response')
                    ->setJSON(['message' => 'Token tidak valid. Silakan login ulang.'])
                    ->setStatusCode(401);
            }

            // CEK APAKAH TOKEN EXPIRED
            $currentTime = date('Y-m-d H:i:s');
            $tokenExpired = $user['token_expired'] ?? null;
            
            if ($tokenExpired && $tokenExpired < $currentTime) {
                // Token sudah expired, hapus token
                $model->update($user['id'], [
                    'token' => null,
                    'token_expired' => null
                ]);
                
                return service('response')
                    ->setJSON([
                        'message' => 'Token telah kadaluarsa. Silakan login ulang.',
                        'error' => 'Token Expired'
                    ])
                    ->setStatusCode(401);
            }

            // Simpan data user ke session
            session()->set('user_data', $user);
            
        } catch (\Exception $e) {
            return service('response')
                ->setJSON(['message' => 'Autentikasi gagal: ' . $e->getMessage()])
                ->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do nothing
    }
}