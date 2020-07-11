<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->group(function () {
    Route::get('/todos', 'TodoController@index');
    Route::post('/todo/create', 'TodoController@store');
    Route::put('/todo/update/{todo}', 'TodoController@update');
    Route::delete('/todo/delete/{todo}', 'TodoController@destroy');
    Route::put('/todos/completeAll', 'TodoController@completeAll');
    Route::delete('/todos/clearCompleted', 'TodoController@clearCompleted');

    Route::post('/logout', 'AuthController@logout');
});

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');

