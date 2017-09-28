<?php

namespace App\Http\Controllers;

use App\Subscription;
use Illuminate\Http\Request;
use Mockery\Exception;
use JWTAuth;

class NotificationController extends Controller
{
    private function getAdminId(Request $request)
    {
        $token = $request->cookie('token');
        if ($token === null) {
            return null;
        }
        $user = JWTAuth::toUser($request->cookie('token'));
        $id = \GuzzleHttp\json_decode($user)->id;
        return $id;
    }

    public function sendSubscription(Request $request){
        try {
            $sub = $request->input('subscription');
            if (null != Subscription::where('subscription', $sub)->first()) {
                return;
            }

            $subscription = new Subscription();
            $subscription->subscription = $sub;
            $subscription->adminId = $this->getAdminId($request);
            $subscription->adminId;
            $subscription->save();

        } catch (Exception $e) {
            return $e;
        }
    }

    public function removeSubscription(Request $request){
        try{
            $sub = $request->input('subscription');
            $subscriptions = Subscription::where('subscription', $sub)->get();
            foreach ($subscriptions as $subscription) {
                $subscription->delete();
            }
        } catch (Exception $e) {
            return $e;
        }
    }
}
