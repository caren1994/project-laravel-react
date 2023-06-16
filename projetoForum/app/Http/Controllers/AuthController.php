<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
   
   public function register(Request $request)
   {
    return User::create([
        'name'=>$request->input('name'),
        'email'=>$request->input('email'),
        'password'=>Hash::make($request->input('password'))
    ]);


   }
   public function login(Request $request)
   {
    $user = User::where('email',$request->input('email'))->first();
    if(!$user){
        return response([
            'message'=>'User not found'
        ],404);
    }
    if(!Hash::check($request->input('password'),$user->password)){
        return response([
            'message'=>'Password is not correct'
        ],401);
    }
    $token = $user->createToken('auth_token')->plainTextToken;

    return response([
        'user'=>$user->name,
        'token'=>$token
        
    ],200);

   }

   
    public function user()
    {
      return Auth::user();
    }
}
