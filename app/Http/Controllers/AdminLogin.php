<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use JWTAuth;

class AdminLogin extends Controller
{
    function index(Request $request)
    {
        return view('login.login-admin');
    }

    function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $client = new Client();
        try {
            $domain = config('domain.domain');
            $res = $client->request('POST', $domain . '/api/login', [
                'form_params' => [
                    'email' => $email,
                    'password' => $password
                ]
            ])->getBody();

            //dd(\GuzzleHttp\json_decode($res));
            $token = \GuzzleHttp\json_decode($res)->token;
            //dd($token);
            setcookie('token', $token);
            return redirect('/dashboard');
            //return redirect('/dashboard');
        } catch (RequestException $e) {
            //dd("wrong!");
            return redirect('login')->with('result', 'fail');
        }

    }

    public function logout()
    {
        $cookie = \Cookie::forget('token');
        Auth::logout();
        //echo "logout";
        return redirect('/')->withCookie($cookie);
        //return redirect("/");
    }

}
