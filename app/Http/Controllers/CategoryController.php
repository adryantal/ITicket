<?php

namespace App\Http\Controllers;
use App\Models\Category;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //adott (al)kategória megkeresése id alapján
    public function getCategory($id) {
        $category = Category::where('id','=',$id)->whereNotNull('main_cat_id');
        return $category;
    }

    //adott főkategória megkeresése id alapján
    public function getService($id) {
        $category = Category::where('id','=',$id)->whereNull('main_cat_id');
        return $category;
    }


    //összes főkat.
    public function getAllServices() {      
        $allservices = Category::whereNull('main_cat_id')
            ->orderBy('cat_name')
            ->get();
        return response()->json($allservices);
    }

    //adott főkat. alá tart. kategóriák
    public function allCatsPerService($id){
        $allcatsperservice = Category::where('main_cat_id','=',$id)
        ->orderBy('cat_name')       
        ->get();
        return response()->json($allcatsperservice);
    }

    public function getCategoriesPerService($id)
    {
        $service =Category::find($id); 
        $categories = $service ->categories;
        return response()->json($categories);

    }

    //adott category service-ének megkeresése
    public function getServicePerCategory($cat_id)
    {
        $category= Category::find($cat_id);
        $service = $category->service; //meghívjuk a Category példány service függvényét
        return response()->json($service);
    }

    //adott service + az alá tart. kategóriák
    public function allCategories_ext(){
        $cat = Category::with('allcategories')->first();
        $cat->allcategories;
        return response()->json($cat);

    }

    //öszes (al)kategória
    public function getAllCategories(){
        $allcategories = Category::whereNotNull('main_cat_id')
        ->orderBy('cat_name')       
        ->get();
        return response()->json($allcategories);

    }


}
