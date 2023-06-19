<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
           $table-> id()->autoIncrement();
            $table-> string('title',200);
            $table->string('name',150);
            $table-> unsignedBigInteger('user_id');
            $table-> unsignedBigInteger('category_id');
            $table-> text('content');
            $table-> timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('category_id')->references('id')->on('categories')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {    
        Schema::table('posts', function(Blueprint $table) {
        
            $table-> dropForeign('posts_user_id_foreign'); 
            $table-> dropForeign('posts_category_id_foreign');
            $table-> dropColumn('user_id');
            $table-> dropColumn('category_id');

        });
        Schema::dropIfExists('posts');
    }
};
