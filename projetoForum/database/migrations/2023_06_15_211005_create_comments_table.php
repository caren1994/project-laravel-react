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
        Schema::create('comments', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name',150);
            $table->unsignedBigInteger('post_id');
            $table->text('content');

            $table->timestamps();

            $table->foreign('post_id')->references('id')->on('posts')->cascadeOnDelete()->cascadeOnUpdate();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function(Blueprint $table) {
            $table-> dropForeign('comments_post_id_foreign');
            $table-> dropColumn('post_id');

        });
        Schema::dropIfExists('comments');
    }
};
