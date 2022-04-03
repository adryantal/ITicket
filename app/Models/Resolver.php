<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resolver extends Model
{
    use HasFactory;

//adott resolverhez tart. kategóriák
public function services()
{    
    return $this->belongsToMany(Category::class, 'category_resolver', 'resolver_id','category_id');
}


//adott megoldóhoz tart. userek
public function users()
{
    return $this->hasMany(User::class);
}


}
