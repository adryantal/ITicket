<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsResolver
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::user()->resolver_id==null){ //ha nem resolver (resolver ID nincs kitöltve), irányítsa majd át a user platformra
            Auth::logout();
            return redirect('/notauthorized'); //még nincs kész az user view útvonal (Tomi feladata), ezér ideiglenesen kijelentkezteti és a notauthorized-ra viszi át
        }
        return $next($request);

    }
}
