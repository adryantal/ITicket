<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
class UserController extends Controller

{

 

    //adott user megkeresése id alapján
    public function getUser($user_id) {
        $user = User::find($user_id);
        return $user;
    }

    public function getAllUsers()
    {
        return response()->json(User::all());
    }


    //melyik resolver csapathoz tart. egy adott user, amennyiben resolver
    public function getResolver($user_id) {
        $user = User::where('id','=',$user_id)->whereNotNull('resolver_id');
        $resolver=$user->resolver;
        return $resolver;
    }

  
      //adott userhez rendelt ticketek
      public function getTickets($user_id)
      {
          $user = User::find($user_id);
          $tickets = $user->tickets;
          return $tickets;
      }


      public function filter(Request $request)
      {
          $queryString = $request->query();
          foreach ($queryString as $key => $value) {
              $explodedKey=explode('_',$key);
              $column=$explodedKey[0];
              $expression=$explodedKey[1];
              $results=User::where($column, $expression, '%' . $value . '%')->get();
          }
          return $results;
      }

      public function filterActiveUsers(Request $request)
      {
          $queryString = $request->query();
          foreach ($queryString as $key => $value) {
              $explodedKey=explode('_',$key);
              $column=$explodedKey[0];
              $expression=$explodedKey[1];
              $results=User::where($column, $expression, '%' . $value . '%')->where('active','=',1)->get();
          }
          return $results;
      }


      public function filterExcAuth(Request $request)
      {
          $queryString = $request->query();
          foreach ($queryString as $key => $value) {
              $explodedKey=explode('_',$key);
              $column=$explodedKey[0];
              $expression=$explodedKey[1];
              $results=User::where($column, $expression, '%' . $value . '%')->where('id','!=',Auth::user()->id)->get();
          }
          return $results;
      }


      public function update(Request $request, $id)
      {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],            
            'phone_number' => ['required', 'string', 'max:20'],
            'department' => ['required', 'string', ],
            //'password' => [ 'nullable','min:8'],            
            //'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            
        ]);

        $user = User::find($id);  
        $request->department=ucwords($request->department); 
        if (strtoupper($request->department) == 'IT') {
            $request->department='IT';           
        } else {
            $request->resolver_id = null;
        } 
        $domain = '@fantasy-comp.com';

        $user->name = ucwords($request->name);
        $user->ad_id =  $request->ad_id;
        $user->email = $request->ad_id . $domain;
        //'password' => Hash::needsRehash($request ->password) ? Hash::make($request ->password) : $request ->password,
        if ($request->password != "") {
            $user->password =  Hash::make($request->password); //default; lehetne egy random generátort beállítani security okok miatt, és első belépéskor a Helpdesk reseteli a usernek a pw-öt
        }
        $user->active =  $request->active; //kezdetben aktív, és a DB Teammel lehet inaktiváltatni 
        $user->phone_number =  $request->phone_number;
        $user->department =  $request->department;
        $user->resolver_id =  $request->resolver_id; 
        $user->save();
        
        
      }
  
  

     


}
