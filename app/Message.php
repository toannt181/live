<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $table='messages';
    protected $fillable=[
        'room_id',
        'sender_id',
        'content',
        'message_type',
        'created_at'
    ];

    public $timestamps = false;
}
