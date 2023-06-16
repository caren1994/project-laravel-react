<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Models\Post;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $post=Post::where('id',$request->input('post'))->first();
        if(!$post){
            return response([
                'message'=>'Post not found'
            ],404);
        }
        $result=Comment::where('post_id',$post->id)->get(); 
        return response($result,200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $post=Post::where('id',$request->input('post'))->first();
            // echo($post);
            if(!$post){
                return response([
                    'message'=>'Post not found'
                ],404);
            }
            return Comment::create([
                'name'=>$request->input('name'),
                'post_id'=>$post->id,
                'content'=>$request->input('content'),
                
            
            ]); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $comment=Comment::findOrFail($id);
        $comment->delete();
        return response([
            'message'=>'Comment deleted'
        ],200);
    }
}
