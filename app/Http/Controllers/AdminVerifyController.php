<?php

namespace App\Http\Controllers;

use App\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use JWTAuthException;


class AdminVerifyController extends Controller
{
    private $admin;
    public function __construct(Admin $admin){
        $this->admin = $admin;
    }

    /**function check admin login
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse: jwt token
     */
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['invalid_email_or_password'], 422);
            }
        } catch (JWTAuthException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }
        return response()->json(compact('token'));
    }

    /**authenticate when an admin send token
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAdminData(Request $request){
        $user = JWTAuth::toUser($request->token);
        return response()->json(['result' => $user]);
    }
}
