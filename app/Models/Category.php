<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    //rekurzív kapcsolat -->$this->hasMany(Class,parentID,childID)
    //a service alatti kategóriákat adja vissza
    public function categories()
    {
        return $this->hasMany(Category::class,'main_cat_id','id');
    }

    //a categoryhoz tart. service-t adja vissza:
    public function service()
    {
        return $this->belongsTo(Category::class,'main_cat_id','id'); 
    }

   //rekurzív "lebontás" a gyerekelemek irányába
    public function allcategories()
{
    return $this->hasMany(Category::class,'main_cat_id','id')->with('allcategories');
    //return $this->categories()->with('allcategories'); 
}

 //adott kategóriához rendelt resolverek
public function resolvers()
{    
    return $this->belongsToMany(Resolver::class, 'category_resolver', 'category_id','resolver_id' );
}


//adott kategóriára nyitott ticketek
function tickets_per_category()
{
    return $this->hasMany(Ticket::class);    
}




}
