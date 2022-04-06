<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

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


      //adott resolverhez tart. ticketek (lehet csak a nyitott ticketeket...)



}
