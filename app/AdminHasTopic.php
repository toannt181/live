<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminHasTopic extends Model
{
    protected $table='adminhastopic';
    protected $fillable=[
        'admin_id',
        'topic_id',
    ];

    public $timestamps = false;
}
