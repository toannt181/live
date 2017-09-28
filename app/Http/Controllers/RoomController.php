<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Message;
use App\Topic;
use App\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use function MongoDB\BSON\toJSON;

class RoomController extends Controller
{
    /**
     * RoomController constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.authAdmin');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param Request $request
     */
    public function getIndex() {
        return view('index');
    }
    /**
     * this function aims to show layout of room
     * @return view: room.room
     */
    public function index()
    {
        //get all rooms which don't have status 3 (the room which has status 3 was closed
        $rooms = Room::where('status', '<>', 3)
                        ->get();
        //declaration of parameters to return with view
        $room_array = [];


        foreach($rooms as $room) {
            //get the name of customers who has been created room
            $customerName = DB::table('customers')
                ->join('messages', 'customers.id', '=', 'messages.sender_id')
                ->where('messages.room_id', '=', $room->id)
                ->orderBy('messages.created_at')
                ->select('customers.name')
                ->first();
            if(!$customerName) {
                $room->delete();
                continue;
            }

            // set attribute to return
            if (($room->status === 1 && $room->assignee === 0)
                || $room->assignee === Auth::user()->id) {

                $room_array[] = ['id' => $room->id,
                    'customerName' => $customerName->name,
                    'topic' => Topic::find($room->topic_id)->name,
                    'status' => $room->status,
                    'created_at' => $room->created_at
                ];
            }
        }

        return view('room.room', ['rooms' => $room_array]);
    }

    /**
     * show closed rooms
     * @return view.history
     */
    public function history()
    {
        $rooms = Room::where('status', 3)
                        ->where('assignee', Auth::user()->id)->get();
        $room_array = [];
        foreach($rooms as $room) {

            $customerName = DB::table('customers')
                ->join('messages', 'customers.id', '=', 'messages.sender_id')
                ->where('messages.room_id', '=', $room->id)
                ->orderBy('messages.created_at')
                ->select('customers.name')
                ->first();
            if(!$customerName) {
                $room->delete();
                continue;
            }

                $room_array[] = ['id' => $room->id,
                    'customerName' => $customerName->name,
                    'topic' => Topic::find($room->topic_id)->name,
                    'status' => $room->status,
                    'created_at' => $room->created_at
                ];

        }

        return view('room.history', ['rooms' => $room_array]);
    }

    /**
     * @param $room_id
     * show chat logs of closed room
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|string
     */
    public function showChatLog($room_id)
    {
        $admin_id = Room::find($room_id)->assignee;
        if(!$admin_id) {
            return "Can't find assignee of room";
        }

        $room_messages = Message::where('room_id', $room_id)
                                ->orderBy('created_at')
                                ->get();
        $customer_id = $room_messages[0]->sender_id;
        $messages = [];
        foreach ($room_messages as $message)
        {
            $sender_name = '';
            if($message->sender_id != 0) {
                $sender_name = Customer::find($message->sender_id)->name;
            }

            $messages[] = [
                'sender_id' => $message->sender_id,
                'sender_name' => $sender_name,
                'content' => $message->content,
                'sent_time' => $message->created_at
            ];
        }
//        dd(Room::find($room_id)->status);
        $customer = Customer::find($customer_id);
        return view('room.chatlog', ['messages' => $messages,
            'room' => Room::find($room_id),
            'room_type' => Topic::find(Room::find($room_id)->topic_id)->name,
            'customer' => $customer
        ]);
    }

    /**
     *
     * @param $room_id
     * @return chat data
     */
    public function chat($room_id)
    {
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
        $room = Room::find($room_id);

        if($room->assignee != 0 && $room->assignee != Auth::user()->id) {

            return 'Room has been assigned by other one!';
        }


        $room_messages = Message::where('room_id', $room_id)->orderBy('created_at')->get();
        $customer_id = $room_messages[0]->sender_id;
        $customer = Customer::find($customer_id);
        $messages = [];
        foreach ($room_messages as $message)
        {
            $sender_name = '';
            if($message->sender_id != 0) {
                $sender_name = Customer::find($message->sender_id)->name;
            }

            $messages[] = [
                'sender_id' => $message->sender_id,
                'sender_name' => $sender_name,
                'content' => $message->content,
                'message_type' => $message->message_type,
                'sent_time' => $message->created_at
            ];
        }
        $chatData = array(
            'messages' => $messages,
            'room' => $room,
            'room_type' => Topic::find($room->topic_id)->name,
            'customer' => \GuzzleHttp\json_encode($customer)
        );

        return $chatData;
    }

}
