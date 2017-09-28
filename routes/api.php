<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('file', 'APIController@getFile');
Route::get('download', 'APIController@download');


Route::group(['middleware' => 'cors'], function () {
    Route::post('admin-set-tag-of-room', 'RoomApiController@handleAdminSetTagOfRoom');
    Route::get('get-admin-id', 'RoomApiController@getAdminId');
    Route::get('request-join-room', 'RoomApiController@handleRequestJoinRoom');
    Route::get('get-all-rooms', 'RoomApiController@getAllRooms');
    Route::get('get-messages', 'MessageApiController@getMessages');
    Route::get('admin-join-room-success', 'RoomApiController@confirmAdminJoinRoom');
    Route::get('confirm-admin-rejoin-room', 'RoomApiController@confirmAdminReJoinRoom');

    Route::post('send-subscription', 'NotificationController@sendSubscription');
    Route::post('remove-subscription', 'NotificationController@removeSubscription');

    Route::post('files/upload', 'APIController@upload')->name('client-upload');

    Route::get('getlink', 'APIController@getLink');
    Route::get('islink', 'APIController@isLink');
    Route::get('gettopics', 'APIController@getTopics');

    Route::post('createToken', 'UserController@createToken');
    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('getData', 'UserController@getAuthUser');
    });

    Route::post('login', 'AdminVerifyController@login');
    Route::group(['middleware' => 'jwt.authAdmin'], function () {
        Route::get('getAdminData', 'AdminVerifyController@getAdminData');
    });

    Route::get('getonlineadmin', 'APIController@getOnlineAdmin');

    Route::get('gettopicofadmin', 'AdminController@getTopicOfAdmin');
});