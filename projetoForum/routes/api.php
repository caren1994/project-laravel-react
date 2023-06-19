<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group( function () {
    Route::get('user',[AuthController::class,'user']);
    Route::get('/post',[PostController::class,'index']);
    Route::get('/post/{id}',[PostController::class,'show']);
    Route::get('/category/{name}',[CategoryController::class,'show']);
    Route::get('/comment/{id}',[CommentController::class,'index']);
    Route::post('/comment',[CommentController::class,'store']);
    Route::post('/post',[PostController::class,'store']);
    Route::delete('/post/{id}',[PostController::class,'destroy']);
    Route::delete('/comment/{id}',[CommentController::class,'destroy']);
    
});