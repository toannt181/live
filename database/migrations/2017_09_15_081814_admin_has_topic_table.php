<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AdminHasTopicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adminhastopic', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('admin_id');
            $table->integer('topic_id');
            $table->unique(array('admin_id', 'topic_id'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('adminhastopic');
    }
}
