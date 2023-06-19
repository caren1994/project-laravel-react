<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Models\Category;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allPosts= Post::all();
        return $allPosts;
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
            'title'=>'required',
            'name'=>'required',
            'category'=>'required',
            'content'=>'required'
        ]);
        $category=Category::where('name',$request->input('category'))->first();
        if(!$category){
            return response([
                'message'=>'Categoria não encontrada'
            ],404);
        }

        Post::create([
            'title'=>$request->input('title'),
            'name'=>$request->input('name'),
            'user_id'=>$request->user()->id,
            'content'=>$request->input('content'),
            'category_id'=>$category->id,
            
        
        ]);
        return response([
            'message'=>'Post criado com sucesso!'
        ],200);

    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {   
        $post=Post::where('id',$id)->first();
        if(!$post){
            return response([
                'message'=>'Post não encontrado'
            ],404);
        }
        return response($post,200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,int $id)
    {
        $post=Post::findOrFail($id);
        if(!$post->user_id == $request->user()->id){
            return response([
                'message'=>'você não é autorizado a deletar esse post'
            ],404);
        }
        $post->delete();
        return response([
            'message'=>'Post deletado com sucesso!'
        ],200);
    }
}
