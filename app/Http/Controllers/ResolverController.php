<?php

namespace App\Http\Controllers;
use App\Models\Resolver;


use Illuminate\Http\Request;

class ResolverController extends Controller
{
    public function getAllResolvers()
    {
        return response()->json(Resolver::all());
    }

    public function filter(Request $request)
    {
        $queryString = $request->query();
        foreach ($queryString as $key => $value) {
            $explodedKey=explode('_',$key);
            $attribute=$explodedKey[0];
            $expression=$explodedKey[1];
            $results=Resolver::where($attribute, $expression, '%' . $value . '%')->get();
        }
        return $results;
    }
}
