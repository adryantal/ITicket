<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ResolverController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\AttachmentController;
use App\Http\Middleware\IsResolver;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/login', function () { return view('auth.login');}); //login oldal

Route::get('/logout', [LogoutController::class, 'perform']); //bejelentkezett user kijelentkeztetése
Route::get('/notauthorized', function () {return view('it.notauthorized');});



Route::middleware(['auth'])->group(function () {    

});


Route::middleware(['auth', IsResolver::class])->group(function () {
   

    //oldalak útvonalai
    Route::get('/switchboard', function () {return view('switchboard');});   
    Route::get('/switchboard/db', function () {return view('it.switchboardfordb');}); //ez majd csak a db-eseknek lesz elérhető https://stackoverflow.com/questions/65835538/laravel-8-register-user-while-logged-in
    Route::get('/alltickets', function () {return view('it.ticketlist');});
   

    /*Útvonalak ticketekre*/
    Route::get('/api/ticket/all', [TicketController::class, 'getAllTickets']);  //összes ticket  
    Route::get('/api/ticket/all/search', [TicketController::class, 'generalSearch']); //általános keresés (összes attribútumon értékein belül keres) 
    Route::get('/api/ticket/all/filter', [TicketController::class, 'filter']); //egy adott- vagy több attribútum szerinti szűrés
    Route::post('/api/ticket', [TicketController::class, 'store']); //új ticket rögzítése 
   
    Route::get('/api/ticket/{id}', [TicketController::class, 'getTicket']);  //adott ticket megkeresése id alapján

    /*Útvonalak kategóriákra*/
    Route::get('/api/service/all', [CategoryController::class, 'getAllServices']);  //összes főkat.
    Route::get('/api/category/all', [CategoryController::class, 'getAllCategories']);  //összes alkat.
    Route::get('/api/allcatsperservice/{id}', [CategoryController::class, 'allCatsPerService']); //adott service alá tart. kategóriák 
    Route::get('/api/service/{id}/categories', [CategoryController::class, 'getCategoriesPerService']); //adott service alá tart. kategóriák v2.
    Route::get('/api/category/{id}/service', [CategoryController::class, 'getServicePerCategory']); //adott category service-ének megkeresése
    Route::get('/api/category/all/extended', [CategoryController::class, 'allCategories_ext']); //adott service + az alá tart. kategóriák
    Route::get('/api/service/{id}', [CategoryController::class, 'getService']);//adott főkategória (service) megkeresése id alapján
    Route::get('/api/category/{id}', [CategoryController::class, 'getCategory']);  //adott alkategória (category) megkeresése id alapján

    /*Útvonalak a csatolmányokhoz kapcsolódóan*/
    Route::get('/api/attachment/all', [AttachmentController::class, 'getAllAttachments']);  //összes csatolmány
    Route::get('/api/ticket/{id}/attachments', [TicketController::class, 'getAttachmentsPerTicket']); //adott tickethez tart. csatolmányok
    Route::get('/api/attachment/{id}/ticket', [AttachmentController::class, 'getTicketPerAttachment']); //adott csatolmány mely tickethez tart. 
    Route::get('/api/attachment/{id}', [AttachmentController::class, 'getAttachment']);//adott csatolmány megkeresése id alapján

    /*Útvonalak userekhez --> ez a felület majd csak a database-eseknek lesz engedélyezett*/
    Route::get('/api/user/all', [UserController::class, 'getAllUsers']);  //összes user
    Route::get('/api/user/{id}', [UserController::class, 'getUser']);  //adott user megkeresése id alapján

    Route::get('/newuser', function () { return view('newuser');});  //új user hozzáadása - még nincs kész; egyelőre SOS megoldásnak a newuser.blade.php használandó
});


require __DIR__.'/auth.php';

