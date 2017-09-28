<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table='rooms';
    protected $fillable=[
        'topic_id',
        'status',
        'assignee',
        'created_at',
        'customer_id',
        'room_type',
        'closed_at'
    ];

    public $timestamps=false;

    public function topic()
    {
        return $this->hasOne('App/Topic');
    }

    public function getBasicData()
    {
        $users = User::select(['id','name','email','created_at','updated_at']);

        return Datatables::of($users)->make();
    }
}
