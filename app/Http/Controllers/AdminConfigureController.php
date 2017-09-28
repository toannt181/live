<?php

namespace App\Http\Controllers;


use App\Topic;
use Doctrine\DBAL\Schema\Schema;
use Illuminate\Http\Request;
use Mockery\Exception;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\DB;

class AdminConfigureController extends Controller
{
    //

    public function runConfigure(Request $request)
    {
        try {
            $registers = $request['registers'];
            $topics = $request['topics'];


            $resultTopics = [];

            //todo: check duplicate and add topic to database
            $topics = array_unique($topics, SORT_STRING);
            Topic::truncate();
            foreach ($topics as $topic) {
                $newTopic = new Topic;
                $newTopic->name = $topic;
                $newTopic->save();
                $resultTopics[] = ["id" => $newTopic->id, "name" => $newTopic->name];
            }

            //todo create source.json contains configuration of client
            $configData = \GuzzleHttp\json_encode(["registers" => $registers,
                "topics" => $resultTopics]);
            $fp = fopen('source.json', 'w');
            fwrite($fp, $configData);
            fclose($fp);

            //todo: copy source.json to node folder
            $moveFile = new Process("cp source.json ../node/src/client");
            $moveFile->run();

            if (!$moveFile->isSuccessful()) {
                throw new ProcessFailedException($moveFile);
            }


            //todo: run webpack
            $serverNode = "../node";

            $processBuildWebpack = new Process('./node_modules/.bin/webpack');

            $processBuildWebpack->setWorkingDirectory($serverNode);
            $processBuildWebpack->run();
            if (!$processBuildWebpack->isSuccessful()) {
                throw new ProcessFailedException($processBuildWebpack);
            }

            //echo "webpack build successfully";


            return response()->json(["success" => true, 'url' => config('domain.bundle')]);
        } catch (Exception $e) {
            return response()->json(["success" => false, 'error' => $e]);
        }
    }


    public function show()
    {
        $topics = Topic::all();
        $customerColumn = DB::select(DB::raw( 'SELECT COLUMN_NAME, COLUMN_COMMENT
                                    FROM INFORMATION_SCHEMA.COLUMNS
                                    WHERE table_name = "customers" and 
                                    table_schema = "local_chat"'));
        $newArray = array_slice($customerColumn, 1, count($customerColumn) - 3);
//        dd($newArray);

//        echo "TOPIC PAGE";
        //  return view('topic.topic', ['topics' => $topics]);
        return view('room.configchat', ['topics' => $topics, "registers" => $newArray]);
    }
}
