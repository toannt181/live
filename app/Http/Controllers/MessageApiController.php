<?php

namespace App\Http\Controllers;

use App\Customer;
use App\File;
use App\Message;
use Illuminate\Http\Request;

class MessageApiController extends Controller
{
    public function getMessages(Request $request)
    {
        //$files =json_encode(config('message.types.DOCUMENTATION'));
        $documentTypes = array_values(config('message.types.DOCUMENTATION'));
        //dd($files);


        $messages = Message::where('room_id', $request->roomid)
            ->orderBy('created_at')
            ->get();
        $result = [];

        foreach($messages as $message)
        {
            $senderName = null;
            if($message->sender_id == 0) {
                $senderName = "Admin";
            } else {
                $senderName = Customer::find($message->sender_id)->name;
            }
            $name = "A documentation attached";

            if (in_array($message->message_type, $documentTypes)) {
                $fileUrl = explode('=', $message->content)[1];
                $file = File::where('url', '=', $fileUrl)->first();
                if ($file) {
                   $name = $file->name;
                }
            }

            $result[] = [
                "id" => $message->id,
                "senderId" => $message->sender_id,
                "senderName" => $senderName,
                "message" => [
                    "content" => $message->content,
                    "type" => $message->message_type,
                    "name" => $name
                ],
                "metaLink" => false,
                "createdAt" => $message->created_at,

            ];
        }
        return $result;
    }
}
