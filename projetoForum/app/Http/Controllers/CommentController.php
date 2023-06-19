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
    public function index(int $id)
    {
        $post=Post::where('id',$id)->first();
        if(!$post){
            return response([
                'message'=>'Post not found'
            ],404);
        }
        $result=Comment::where('post_id',$post->id)->get(); 
        if($result->isEmpty()){
            return response([
                'message'=>'Comentários não encontrados'
            ],404);
        }
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
            $request->validate([
                'name'=>'required',
                'post'=>'required',
                'content'=>'required'
            ]);
            $post=Post::where('id',$request->input('post'))->first();
            // echo($post);
            if(!$post){
                return response([
                    'message'=>'Post não encontrado'
                ],404);
            }
            return Comment::create([
                'name'=>$request->input('name'),
                'user_id'=>$request->user()->id,
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
    public function destroy(Request $request, string $id)
    {
        $comment=Comment::findOrFail($id);
        if(!$comment->user_id==$request->user()->id){
            return response([
                'message'=>'você não é autorizado a deletar esse comentário'
            ],404);
        }
        $comment->delete();
        return response([
            'message'=>'Comentário deletado com sucesso!'
        ],200);
    }
}
