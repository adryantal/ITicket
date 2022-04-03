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
}
