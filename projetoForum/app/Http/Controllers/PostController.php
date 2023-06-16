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
        $category=Category::where('name',$request->input('category_id'))->first();
        if(!$category){
            return response([
                'message'=>'Category not found'
            ],404);
        }

        return Post::create([
            'title'=>$request->input('title'),
            'name'=>$request->input('name'),
            'content'=>$request->input('content'),
            'category_id'=>$category->id,
            
        
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {   
        //
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
    public function destroy(Post $post)
    {
        //
    }
}
