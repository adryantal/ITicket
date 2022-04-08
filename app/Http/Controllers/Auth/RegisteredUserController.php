<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.newuser');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            //'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $domain = '@fantasy-comp.com';
        $user = User::create([
            
            'name' => $request->name,            
            'ad_id' =>  $request->ad_id, 
            'email' => $request->ad_id.$domain,
            //'password' => Hash::needsRehash($request ->password) ? Hash::make($request ->password) : $request ->password,
            'password' => '12345678', //default; lehetne egy random generátort beállítani security okok miatt, és első belépéskor a Helpdesk reseteli a usernek a pw-öt
            'active' =>  $request->active, //kezdetben lehetne akár aktív, és a DB Teammel lehet aktiváltatni 
            'phone_number' =>  $request->phone_number, 
            'department' =>  $request->department, 
            'resolver_id' =>  $request->resolver_id, 
        ]);

        event(new Registered($user));

        //Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
