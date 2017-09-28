<?php

namespace App\Http\Controllers;

use App\Admin;
use App\Room;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;


class DashboardController extends Controller
{
    /**
     * DashboardController constructor.
     */
    function __construct()
    {
        $this->middleware('jwt.authAdmin');
    }

    public function getOnlineAdmin()
    {
        $onlAdmins = [];

        return count($onlAdmins);
    }

    public function getDashboard()
    {
        $rooms = Room::all();

        $countRoom = DB::table('rooms')->count();

        $countAccount = DB::table('customers')-> count();

        //$adminCount = $this->getOnlineAdmin();
        $adminCount = 0;

        return view('dashboard.index',['rooms'=>$rooms,'countRoom'=>$countRoom,'countAccount'=>$countAccount, 'adminCount' => $adminCount]);
    }


}
