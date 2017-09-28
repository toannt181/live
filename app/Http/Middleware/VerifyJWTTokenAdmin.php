<?php
namespace App\Http\Middleware;
use Closure;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
class VerifyJWTTokenAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try{

            if (isset($_COOKIE['token'])) {
                $token = $_COOKIE['token'];
                $user = JWTAuth::toUser($token);
            } else {
                Auth::logout();
                return redirect(route('login-admin'));
                //return response()->json(['error'=>'Token is required']);
            }
        }catch (JWTException $e) {
            if($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                Auth::logout();
                return redirect(route('login-admin'));
//                return response()->json(['token_expired'], $e->getStatusCode());
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                Auth::logout();
                return redirect(route('login-admin'));
//                return response()->json(['token_invalid'], $e->getStatusCode());
            }else{
                Auth::logout();
                return redirect(route('login-admin'));
//                return response()->json(['error'=>'Token is required']);
            }
        }
        //dd(\GuzzleHttp\json_decode($user)->id);
        $id = \GuzzleHttp\json_decode($user)->id;
        Auth::loginUsingId($id);
//        if (Auth::user()->is_super == false) {
//            return redirect(route('admin-chat'));
//        }
        return $next($request);
    }
}