<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{

    /** Extension array */
    const EXT_ARRAY = array(
        'image' => "IMAGE", //image
        'application/pdf' => "PDF", //pdf
        'application/msword' => "WORD", //doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => "WORD", //docx
        'application/vnd.ms-excel' => "EXCEL", //xls
        'application/vnd.ms-office' => "EXCEL", //xls
        'application/excel' => "EXCEL", //xls
        'application/x-excel' => "EXCEL", //xls
        'application/x-msexcel' => "EXCEL", //xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => "EXCEL", //xlsx
    );

    /**
     * FileController constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.authAdmin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //dd($request->cookie('token'));
        $files = File::all();
        return view('file.file', ['files'=>$files]);
    }

    /**
     * admin upload file
     *
     * @param Request $request
     * @return string
     */
    public function adminUpload(Request $request)
    {
        $path = $this->saveFile($request);
        return redirect('files');
    }

    /**
     * upload a file
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        $data = array(
            "status" => 0,
            "type" => "",
            "content" => "",
            "name" => ""
        );
        //dd($request->files);
        $res = $this->saveFile($request);
        //dd(('message.types.DOCUMENTATION.' . $res['type']));
        if ($res['path'] !== null) {
            $data["status"] = 1;

            if ($res['type'] == 'IMAGE') {
                $data["type"] = config('message.types.'.$res['type']);
            }else $data["type"] = config('message.types.DOCUMENTATION.' . $res['type']);
            $domain = config('domain.domain');
            $data["content"] = $domain . "/api/file?url=" . $res['path'];
            $data['name'] = $res['name'];
        }

        return response()->json($data);
    }
    
    /**
     * response a file
     *
     * @param Request $request
     * @return mixed
     */
    public function getFile(Request $request)
    {
        $url = $request->query('url');

        $filename = storage_path('/app/'. $url);

        if (file_exists($filename)) {
            return response()->file($filename);
        } else {
            echo 'File doesn\'t exist!';
        }
    }

    /**
     * download a file
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function download(Request $request)
    {
        $url = $request->query('url');

        $filename = storage_path('/app/'. $url);
        if (file_exists($filename)) {
            return response()->download($filename);
        } else {
            echo 'File doesn\'t exist!';
        }
    }

    /**
     * delete a file and its information
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function delete(Request $request)
    {
        $id = $request->input('id');
        $file = File::where('id', $id)->first();
        if ($file == NULL) {
            return redirect('files');
        } else {
            $url = $file->url;

            /** delete file in storage if file exist*/
            $urlFile = storage_path('/app/'. $url);
            if (file_exists($urlFile)) {
                Storage::delete($url);
            }
            /** Delete info in database*/
            $file->delete();
        }
        return redirect("files");
    }

    /**
     * return type in config or null
     *
     * @param $type
     * @return bool
     */
    public function isValidType($type)
    {
        foreach (FileController::EXT_ARRAY as $key=>$val) {
            if (strpos($type, $key) !== false) return $val;
        }
        return null;
    }

    /**
     * save file and return path if file is valid
     *
     * @param Request $request
     * @return null
     * @internal param $file
     */
    public function saveFile(Request $request)
    {
        $res = array(
            'path' => null,
            'type' => null,
            'name' => null,
        );
        $file = $request->file('fileToUpload');
        //dd($file->getClientMimeType());
        if ($file !== null && $file->isValid()) {
            $res['type'] = $this->isValidType($file->getClientMimeType());
            if ($res['type'] !== null) {
                /** storage and return a path of file */
                $res['path'] = $file->store('files');
                $res['name'] = $file->getClientOriginalName();
                /** save info of file in database */
                $File = new File();
                $File->name = $file->getClientOriginalName();
                $File->url = $res['path'];
                $File->contentType = $file->getMimeType();
                $File->save();
            }
        }
        return $res;
    }
}
