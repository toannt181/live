<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Message;
use App\Topic;
use Doctrine\DBAL\Query\QueryException;
use Illuminate\Http\Request;
use App\Room;
use JWTAuth;
use Mockery\Exception;

class RoomApiController extends Controller
{
    public function getAdminId(Request $request)
    {
        $token = $request->cookie('token');
        if ($token === null) {
            return null;
        }
        $user = JWTAuth::toUser($request->cookie('token'));
        $id = \GuzzleHttp\json_decode($user)->id;
        return $id;
    }

    public function getAllRooms(Request $request)
    {
        $id = $this->getAdminId($request);
//        $id = 2;

        $result = [];
        // get all in-active room
        $inActiveRooms = Room::where('status', 1)->get();

        // get active of current admin
        $activeRooms = Room::where('status', 2)
            ->where('assignee', $id)
            ->get();

        foreach ($inActiveRooms as $inActiveRoom)
        {
            $id = $inActiveRoom->id;  //id
            $firstMessage = Message::where([['room_id', $id], ['sender_id', '<>', 0]])
                ->orderBy('created_at')
                ->first();
            if (!$firstMessage) {
                continue;
            }

            $customerId = $firstMessage->sender_id;
            $customer = Customer::find($customerId);
            $customerName = $customer->name;
            if ($inActiveRoom->room_type === 'facebook') {
                $customerId = $customer->fb_id;
            }
            $topicName = Topic::find($inActiveRoom->topic_id)->name;  //topic name
            $result[] = [
                "id" => $id,
                "topicName" => $topicName,
                "customerName" => $customerName,
                "createdAt" => $inActiveRoom->created_at,
                "roomType" => $inActiveRoom->room_type,
                "status" => $inActiveRoom->status,
                "customerId" => $customerId
            ];
        }

        foreach ($activeRooms as $activeRoom)
        {
            $id = $activeRoom->id;
            $firstMessage = Message::where([['room_id', $id], ['sender_id', '<>', 0]])
                ->orderBy('created_at')
                ->first();
            if (!$firstMessage) {
                continue;
            }

            $customerId = $firstMessage->sender_id;
            $customer = Customer::find($customerId);
            $customerName = $customer->name;
            if ($activeRoom->room_type === 'facebook') {
                $customerId = $customer->fb_id;
            }

            $topicName = Topic::find($activeRoom->topic_id)->name;  //topic name
            $closed = false;
            if (Message
                ::where('message_type', 900)
                ->where('room_id', $id)->first() != null ) {
                $closed = true;
            }
            $result[] = [
                "id" => $id,
                "topicName" => $topicName,
                "customerName" => $customerName,
                "createdAt" => $activeRoom->created_at,
                "roomType" => $activeRoom->room_type,
                "status" => $activeRoom->status,
                "customerId" => $customerId,
                "closed" => $closed
            ];
        }
        return $result;
    }

    /**
     * handle event admin send request join a room
     */
    public function handleRequestJoinRoom(Request $request)
    {
        $roomId = $request->input('roomid');
        $room = Room::find($roomId);
        if ($room->assignee != 0 && $roomId != 1) {
            return response()->json(["result"=>false]);
        }
        else {
            return response()->json(["result"=>true]);
        }
    }

    public function confirmAdminJoinRoom(Request $request)
    {
        try {
            $roomId = $request->input('roomid');
            $room = Room::find($roomId);
            $room->assignee = $this->getAdminId($request);
            $room->status = 2;
            $room->save();
            return response()->json(true);
        }
        catch (Exception $e) {
            return false;
        }
    }

    /**
     * @brief handle event admin send request to re join
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function confirmAdminReJoinRoom(Request $request)
    {
        $roomId = $request->input('roomid');
        $room = Room::find($roomId);
        if ($room->assignee != $this->getAdminId($request)) {
            throw new Exception("Critical error");
        }
        if ($room->status = 2) {
            return response()->json(true);
        } else {
            return response()->json(false);
        }
    }

    /**
     * @brief handle event admin send request to set tag of room
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleAdminSetTagOfRoom(Request $request)
    {
        try {
            $roomId = $request->roomId;
            $status = $request->status;
            if (Room::find($roomId) == null) {
                return response()->json(["result" => false]);
            };
            $room = Room::find($roomId);
            $room->status = $status;
            $room->save();
            return response()->json(["result" => true]);
        }
        catch (QueryException $e) {
            return response()->json(["result" => false, "error" => $e]);
        }
    }
}