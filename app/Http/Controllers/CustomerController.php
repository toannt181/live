<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;
use App\Customer;
use Illuminate\Support\Facades\DB;
use Yajra\Datatables\Facades\Datatables;

class CustomerController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.authAdmin');
    }
    public function index(Request $request) {
//        $data = [];
//        $customers = Customer::all();
//        foreach ($customers as $customer) {
//            $rooms = $this->getRooms($customer->id);
//            $sentMessages = $this->getSentMessages($customer->id);
//            $element = array($customer, $rooms, $sentMessages);
//            $data[] = $element;
//        }
//
////        foreach ($data as $d) {
////            echo $d[0]->id . PHP_EOL;
////        }
        //dd($this->getRooms(1));
        return view('customer.customer');
    }

    public function add(Request $request) {
        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');

        $customer = new Customer();
        $customer->name = $name;
        $customer->email = $email;
        $customer->phone = $phone;

        $customer->save();

        $message = "Add new admin successfully";
        $typeMessage = "success";
        $notification = [
            'message' => $message,
            'alert-type' => $typeMessage,
            'title'=>'Notification'
        ];

        return redirect('/customers')->with('notification', $notification);
    }

    public function edit(Request $request) {

        $id = $request->query('id');
        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');

        $customer = Customer::where('id', $id)->first();

        if ($customer !== NULL) {
            $customer->name = $name;
            $customer->email = $email;
            $customer->phone = $phone;

            $customer->save();
        }

        $message = "Update admin successfully";
        $typeMessage = "success";

        $notification = [
            'message' => $message,
            'alert-type' => $typeMessage,
            'title'=>'Notification'
        ];
        return redirect('/customers')->with('notification', $notification);
    }


    public function getRooms($id){
        //select count(*) as count From
        //(
        //  select count(room_id) as Total
        //  from messages
        //  where sender_id=1
        //  group by room_id
        //) as sub;
        $res = DB::select(DB::raw('select count(*) as count From (' .
          'select count(room_id) as Total ' .
          'from messages ' .
          'where sender_id="1" ' .
          'group by room_id) as sub'));
        //$res = sizeof($numberOfRooms);
        return $res[0]->count;
//        return $numberOfRooms;
    }

    public function getSentMessages($id){
        $numberOfMessages = Message::where('sender_id', $id)
                            ->count();
        return $numberOfMessages;
    }

    public function getRoom(Request $request) {
//        SELECT c.*, count(c.id)
//            FROM customers as c, messages as m
//            WHERE c.id = m.sender_id
//            GROUP BY c.id
//            ORDER BY c.id

//        select c.*, count(distinct m.room_id) from customers as c
//        left join messages as m on c.id = m.sender_id
//        group by c.id;

//        $tmpTable = DB::table('customers as c')
//                        ->join('messages as m', 'c.id', '=', 'm.sender_id')
//                        ->select('c.*', DB::raw('count(c.id)'))
//                        ->groupBy('c.id')
//                        ->orderBy('c.id');

        $tmpTable2 = DB::table('customers as c')
                        ->leftJoin('messages as m', 'c.id', '=', 'm.sender_id')
                        ->select('c.*', DB::raw('count(distinct m.room_id) as rooms'), DB::raw('count(m.id) as sentMessages'))
                        ->groupBy('c.id');

        $customer = $tmpTable2;
        return Datatables::of($customer)->make(true);
    }
}
