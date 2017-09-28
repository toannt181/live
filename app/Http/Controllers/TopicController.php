<?php

namespace App\Http\Controllers;

use App\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function __construct(){
        $this->middleware('jwt.authAdmin');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $topics = Topic::all();
//        echo "TOPIC PAGE";
        return view('topic.topic', ['topics' => $topics]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request) {
        $name = $request->input('name');

        $customer = new Topic();
        $customer->name = $name;

        $customer->save();

        return redirect('/topics');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function edit(Request $request)
    {
        $id = $request->query('id');
        $name = $request->input('name');

        $topic = Topic::where('id', $id)->first();

        if ($topic !== NULL) {
            $topic->name = $name;

            $topic->save();
        }

        return redirect('/topics');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function delete(Request $request)
    {
        $id = $request->query('id');

        $topic = Topic::where('id', $id)->first();

        if ($topic !== NULL) {
            $topic->delete();
        }

        return redirect('/topics');
    }
}
