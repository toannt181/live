<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/////////////////Route login////////////////////
Route::get('login', 'AdminLogin@index')->name('login-admin');
Route::post('login', 'AdminLogin@login')->name('admin-login');
////////////////////////////////////////////////

Route::post('getBundle', 'AdminConfigureController@runConfigure');


//Route::post('getlink', 'DashboardController@getLink')->name('get-link');
Route::group(['middleware' => 'jwt.authAdmin', ], function () {
    Route::group(['middleware' => 'control.admin', ], function () {

        Route::get('admin', 'AdminController@index');
        Route::post('admin/add', 'AdminController@add');
        Route::post('updatepermission', 'AdminController@updatePermission');

        Route::get('customers', 'CustomerController@index');
        Route::get('customers/getroom', 'CustomerController@getRoom');
        Route::post('customers/add', 'CustomerController@add');
        Route::post('customers/edit', 'CustomerController@edit');


        Route::get('topics', 'TopicController@index');
        Route::post('topics/delete', 'TopicController@delete');
        Route::post('topics/add', 'TopicController@add');
        Route::post('topics/edit', 'TopicController@edit');


        Route::get('files', 'FileController@index');
        Route::get('file', 'FileController@getFile');
        Route::get('download', 'FileController@download');
        Route::post('files/upload', 'FileController@upload')->name('uploadIMG');
        Route::post('files/adminupload', 'FileController@adminUpload')->name('admin-upload');
        Route::post('files/delete', 'FileController@delete')->name('delete-file');


        Route::get('configchat','AdminConfigureController@show');
        Route::post('configchat/addtopic', 'AdminConfigureController@addtopic');
        Route::post('configchat/delete','AdminConfigureController@delete');
        Route::post('configchat/edit','AdminConfigureController@edit');


        Route::get( '/_debugbar/assets/stylesheets', '\Barryvdh\Debugbar\Controllers\AssetController@css' );
        Route::get( '/_debugbar/assets/javascript', '\Barryvdh\Debugbar\Controllers\AssetController@js' );


        Route::get('/setpermission', 'AdminController@permissionIndex')->name('admin-permission');
    });


    Route::get('/dashboard','DashboardController@getDashboard');
    Route::get('/','DashboardController@getDashboard');


    Route::get('/room', 'RoomController@getIndex')->name('admin-chat');


    Route::get('admin/profile', 'AdminController@profile');
    Route::post('admin/profile/update', 'AdminController@update');


    Route::get('admin/logout', 'AdminLogin@logout')->name('admin-logout');
});

