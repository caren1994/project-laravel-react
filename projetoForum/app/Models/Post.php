<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Message;
use App\Models\User;
class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'name',
        'user_id', 
        'category_id',
        'content'
    ];
    
    public function category(){
        return $this->belongsTo(Category::class,'category_id');
    }
    public function User(){
        return $this->belongsTo(User::class,'user_id');
    }


    public function messages(){
        return $this->hasMany(Message::class,'post_id');
    }
}
