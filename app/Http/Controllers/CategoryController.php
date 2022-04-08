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
            ->orderBy('name')
            ->get();
        return response()->json($allservices);
    }

    //adott főkat. alá tart. kategóriák
    public function allCatsPerService($id){
        $allcatsperservice = Category::where('main_cat_id','=',$id)
        ->orderBy('name')       
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
        ->orderBy('name')       
        ->get();
        return response()->json($allcategories);

    }

    //főtegóriák adott attr. szerinti szűrése
    public function filterServices(Request $request)
    {
        $queryString = $request->query();
        foreach ($queryString as $key => $value) {
            $explodedKey=explode('_',$key);
            $column=$explodedKey[0];
            $expression=$explodedKey[1];
            $results=Category::where($column, $expression, '%' . $value . '%')->whereNull('main_cat_id')->get();
        }
        return $results;
    }


    //alkategóriák adott attr. szerinti szűrése
    public function filterCategories(Request $request)
    {
        $queryString = $request->query();
        foreach ($queryString as $key => $value) {
            $explodedKey=explode('_',$key);
            $column=$explodedKey[0];
            $expression=$explodedKey[1];
            $results=Category::where($column, $expression, '%' . $value . '%')->whereNotNull('main_cat_id')->get();
        }
        return $results;
    }

    //adott főkategória (service) alá tartozó (al)kategóriák megadott attr. szerinti szűrése
    public function filterCategoriesPerService(Request $request, $serviceId){
    //megkeressük aza dott service-hez tart. kategóriákat
           
        //szűrés
        $queryString = $request->query();
        foreach ($queryString as $key => $value) {
            $explodedKey=explode('_',$key);
            $column=$explodedKey[0];
            $expression=$explodedKey[1];
            $results=Category::where('main_cat_id','=',$serviceId)->where($column, $expression, '%' . $value . '%')->orderBy('name')->get();
        }
        return $results;
    

   

}
}