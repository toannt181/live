<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;
use App\AdminHasTopic;
use App\Topic;
use Illuminate\Http\Request;
use App\Admin;
use Illuminate\Support\Facades\DB;


class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.authAdmin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $admins = Admin::all();
        return view('admin.admin', ['admins'=>$admins]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function add(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $password = $request->input('password');

        #echo $name . " " . $email . " " . $phone . " " . $password;

        $message = "Add new admin successfully";
        $typeMessage = "success";

        if (sizeof(Admin::where('email', $email)->get()) > 0) {
            $message = "Could not add new admin! Email is used!";
            $typeMessage = "error";
        } else {
            $admin = new Admin();
            $admin->name = $name;

            $admin->phone = $phone;
            $admin->email = $email;

            $admin->password = bcrypt($password);

            $admin->save();
        }

        $notification = [
            'message' => $message,
            'alert-type' => $typeMessage,
            'title'=>'Notification'
        ];
        return redirect('admin')->with('notification', $notification);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @internal param int $id
     */
    public function profile(Request $request)
    {
        $id = $request->query('id');

        $admin = Admin::where('id', $id)->get();

        if (sizeof($admin) !== 0) {
//            return dd($admin->first());
            return view('admin.profile', ['admin'=>$admin->first()]);
        } else {
            echo "WRONG!";
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request) {
        $id = $request->query('id');

        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $password = $request->input('password');

        $admins = Admin::where('id', $id)->get();

        $message = "Update profile successfully";
        $typeMessage = "success";

        if (sizeof($admins) !== 0) {
//          return dd($admin->first());
            $admin = $admins->first();
            $oldEmail = $admin->email;
            if (sizeof(Admin::where('email', $email)->get()) > 0 && $email != $oldEmail) {
                $message = "Could not update profile! Email is used!";
                $typeMessage = "error";
            } else {
                $admin->name = $name;

                $admin->phone = $phone;
                $admin->email = $email;

                if ($password != '') $admin->password = bcrypt($password);

                $admin->save();
            }
            $url = '/admin/profile?id=' . $id;
            $notification = [
                'message' => $message,
                'alert-type' => $typeMessage,
                'title'=>'Notification'
            ];
            return redirect($url)->with('notification', $notification);
        } else {
            echo "WRONG!";
        }
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     * @internal param Request $request
     */
    public function permissionIndex() {
        $admins = Admin::all();
        return view('admin.setpermissions', ['admins' => $admins]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicOfAdmin(Request $request) {
        $adminId = $request->query('id');
        //dd($adminId);
        $topics = DB::select('select t.id as id, t.name as name, aht.id as ahtid
                                FROM adminhastopic as aht
                                    RIGHT JOIN topics as t
                                      ON t.id = aht.topic_id AND aht.admin_id = ?;'
        , [$adminId]);
        //dd($topics);
        //$data = json_encode($topics);
        //echo gettype($data);
        return response()->json($topics);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirect
     */
    public function updatePermission(Request $request) {
        //dd($request);
        $this->updateAgentOrAdmin($request);

        $this->updateTopic($request);

        return redirect(route('admin-permission'));
    }

    /**
     * @param Request $request
     * @internal param $id
     * @internal param $isSuper
     */
    private function updateAgentOrAdmin($request)
    {
        //dd($request);
        $id = $request->input('admin-id');
        $isSuper = ($request->input('result-radio') === 'Admin' ? 1 : 0);
        $admin = Admin::where('id', $id)->first();
        //dd($admin);
        $admin->is_super = $isSuper;
        $admin->save();
    }

    /**
     * @param Request $request
     */
    private function updateTopic($request)
    {
        $id = $request->input('admin-id');
        DB::table('adminhastopic')->where('admin_id', $id)->delete();

        $topics = Topic::all();
        foreach ($topics as $topic) {
            $topicId = $topic->id;
            if ($request->input('checkbox-' . $topicId) === 'on') {
                $record = new AdminHasTopic();
                $record->admin_id = $id;
                $record->topic_id = $topicId;
                $record->save();
            }
        }


    }
}
