<?php

namespace App\Http\Controllers;

use App\File;
use App\Topic;
use DOMDocument;
use Illuminate\Http\Request;
use Mockery\Exception;

class APIController extends FileController
{
    private $c;
    /**
     * APIController constructor.
     */
    public function __construct()
    {
        $this->c = new DashboardController;
    }

    /**
     * @param string $method
     * @param array $parameters
     * @return mixed|void
     */
    public function __call($method, $parameters)
    {
       $this->c->$method($parameters);
    }

    /**
     * return all topic
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopics() {
        $topics = Topic::all();
        return response()->json($topics);
    }

    /**
     * @param $url
     * @return mixed: content of page
     */
    public function file_get_contents_curl($url)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }

    /**
     * @param $url
     * @return string: Title of page
     */
    public function getTitleHTML($url)
    {
        $html = $this->file_get_contents_curl($url);

        //parsing begins here:
        $doc = new DOMDocument();
        @$doc->loadHTML($html);
        $nodes = $doc->getElementsByTagName('title');

        //get and display what you need:
        $title = $nodes->item(0)->nodeValue;

        return $title;
    }

    public function isValidLink($url) {
        /**
         * First check if string is a link or not
         */
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            //echo "Link is invalid";
            return false;
        }

        /**
         * Second check if string is link or not by get header
         */
        $header = get_headers($url);
        //echo $header[2];
        if ( strpos($header[0], '200 OK') !== false && strpos($header[2], 'text/html') !== false) {
            return true;
        }
        return false;
    }

    /**
     * Check a string is a link or not
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function isLink(Request $request)
    {
        $url = $request->query('url');
        $res = array(
            "result" => true,
            "meta" => array(
                "url" => $url,
                "title" => "",
                "image" => null,
                "description" => ""
            )
        );

        $res["result"] = $this->isValidLink($url);

        if ($res["result"] === true) {
            $meta = null;
            //return response()->json($header);
            $meta = get_meta_tags($url);
            /**
             * get description, title in meta of a page
             */
            foreach ($meta as $key=>$value) {
                if (strpos(strtolower($key), 'description') !== false) {
                    $res["meta"]["description"] = $value;
                    //echo $key . PHP_EOL . $value;
                }

                if (strpos(strtolower($key), 'image') !== false) {
                    $res["meta"]["image"] = $value;
                }
            }

            /** get favicon if there is no image in current result */
            if ($res["meta"]["image"] === null)
                $res["meta"]["image"] = 'https://www.google.com/s2/favicons?domain=' . $url;

            /** get title */
            $res["meta"]["title"] = $this->getTitleHTML($url);
        }
        return response()->json($res);
//        return $meta;
    }

    /**
     * Get metadata of link
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLink(Request $request)
    {

        $url = $request->query('url');

        /////////////Init result//////////////////////
        $res = array(
            "result" => array("status"=> "OK"),
            "meta" => array(
                "url" => $url,
                "title" => "",
                "image" => null,
                "description" => ""
            ));

        if (!$this->isValidLink($url)) {
            $res["result"]["status"] = 'ERROR';
            return response()->json($res);
        } else {
            $res["result"]["status"] = 'OK';
        }

        $meta = get_meta_tags($url);

        /**
         * get description, title in meta of a page
         */
        foreach ($meta as $key=>$value) {

            if (strpos(strtolower($key), 'description') !== false) {
                $res["meta"]["description"] = $value;
                //echo $key . PHP_EOL . $value;
            }

            if (strpos(strtolower($key), 'image') !== false) {
                $res["meta"]["image"] = $value;
            }
        }

        /** get favicon if there is no image in current result */
        if ($res["meta"]["image"] === null)
            $res["meta"]["image"] = 'https://www.google.com/s2/favicons?domain=' . $url;

        /** get title */
        $res["meta"]["title"] = $this->getTitleHTML($url);
        return response()->json($res);
    }

    public function getAdminConstroller(Request $request)
    {
        return $this->c->getOnlineAdmin();
    }
}
