<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ResolverController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\JournalController;
use App\Http\Middleware\IsResolver;
use App\Http\Middleware\IsActiveUser;
use App\Http\Middleware\IsDbTeamMember;

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

Route::get('/', function () {return redirect('/login');});
Route::get('/login', function () { return view('auth.login');}); //login oldal
Route::get('/logout', [LogoutController::class, 'perform']); //bejelentkezett user kijelentkeztetése
Route::get('/notauthorized', function () {return view('it.notauthorized');});
Route::get('/test/getajax', function () { return view('it.test.testGetAjax');});
Route::get('/test/moduser', function () { return view('it.test.testModUser');});

Route::middleware(['auth', IsActiveUser::class])->group(function () {

    Route::middleware(['auth', IsResolver::class])->group(function () {  
        //oldalak útvonalai
        Route::get('/switchboard', function () {return view('switchboard');});    
        Route::get('/alltickets', function () {return view('it.ticketlist');}); //ticketek kilistázása
        Route::get('/newticket',  function () {return view('it.newticket');}); //új ticket rögzítése - form
        Route::get('/modifyticket',  function () {return view('it.modifyticket');})->name('modifyticket'); // ticket módosítása - form
        Route::get('/api/ticket/new/number', [TicketController::class, 'getLastTicketSubmittedByAuthUser']); //sikeres rögz. után a ticketszám/ticketadatok lekérése
        Route::get('/teamcharts',  function () {return view('it.teamcharts');}); //chartok    

        /*Útvonalak chartokhoz*/
        Route::get('api/charts/team/tickets/open',  [TicketController::class, 'openTicketsTeam']); //a bejelentkezett user csapata által kezelt, nyitott jegyek száma személyenként
        Route::get('api/charts/team/tickets/resolved',  [TicketController::class, 'resolvedTicketsTeam']); //a bejelentkezett user csapatának 30 napon belüli lezárt jegyei személyenként
        Route::get('api/charts/team/tickets/breachedsla',  [TicketController::class, 'breachedSlaTicketsTeam']); //a bejelentkezett user csapatának SLA breached nyitott ticketei, személyenként
        Route::get('api/charts/team/tickets/breakdownbytype',  [TicketController::class, 'bdTypeTicketsTeam']); //a bejelentkezett user csapata megoldott ticketeinek típus szerinti eloszlása az utolsó 30 napban

        /*Útvonalak ticketekre*/
        Route::get('/api/ticket/all', [TicketController::class, 'getAllTickets']);  //összes ticket kilistázása 
        Route::get('/api/ticket/all/assignedtome', [TicketController::class, 'getAuthUserTickets']);  //a bejelentkezett user által kezelt ticketek kilistázása 
        Route::get('/api/ticket/all/assignedtomyteam', [TicketController::class, 'getAuthTeamTickets']);  //a bejelentkezett user csapatának tagjaihoz rendelt ticketek kilistázása 
        Route::get('/api/ticket/all/assignedtome/{type}', [TicketController::class, 'getAuthUserTicketsPerType']);  //a bejelentkezett user jegyei típus szerint
        Route::get('/api/ticket/all/search', [TicketController::class, 'generalSearch']); //általános keresés (összes attribútum értékein belül keres) 
        Route::get('/api/ticket/all/filter', [TicketController::class, 'filter']); //egy adott- vagy több attribútum szerinti szűrés ticketekre  
        Route::get('/api/ticket/get/{ticketnr}', [TicketController::class, 'dataforModifyTicketForm']); //ticket nr. alapján ticketadatokat ad vissza  
        Route::get('/api/ticket/all/searchtickets', [TicketController::class, 'search']); //egy adott- vagy több attribútum szerinti szűrés ticketekre (csak a ticket táblán belül)    
        Route::get('/api/ticket/{id}', [TicketController::class, 'getTicket']);  //adott ticket megkeresése id alapján
        Route::get('/modifyticket/{ticketnr}', [TicketController::class, 'retrieveConstTicketData']); //a nem változtatható ticketadatok kilistázása ticketszám alapján
        Route::get('/api/ticket/parentfor/{ticketnr}', [TicketController::class, 'allTicketsExceptCurrent']);//adott tickethez kiválasztható parent ticketek a modify formon
        Route::get('/api/ticket/all/unassigned', [TicketController::class, 'getUnassignedTickets']);//"New" státuszú-, illetve kezelő munkatárs nélküli ticketek kilistázása
        Route::post('/api/ticket', [TicketController::class, 'store']); //új ticket rögzítése  
        Route::put('/api/ticket/{id}', [TicketController::class, 'update']); //ticket updatelése a modify formon keresztül
        Route::get('/api/ticket', function(){ return redirect('/newticket');}); //új ticket rögzítése után 

        /*Útvonalak kategóriákra*/
        Route::get('/api/service/all', [CategoryController::class, 'getAllServices']);  //összes főkat.
        Route::get('/api/category/all', [CategoryController::class, 'getAllCategories']);  //összes alkat.
        Route::get('/api/allcatsperservice/{id}', [CategoryController::class, 'allCatsPerService']); //adott service alá tart. kategóriák 
        Route::get('/api/service/{id}/categories', [CategoryController::class, 'getCategoriesPerService']); //adott service alá tart. kategóriák v2.
        Route::get('/api/category/{id}/service', [CategoryController::class, 'getServicePerCategory']); //adott category service-ének megkeresése
        Route::get('/api/category/all/extended', [CategoryController::class, 'allCategories_ext']); //adott service + az alá tart. kategóriák
        Route::get('/api/service/{id}', [CategoryController::class, 'getService']);//adott főkategória (service) megkeresése id alapján
        Route::get('/api/category/{id}', [CategoryController::class, 'getCategory']);  //adott alkategória (category) megkeresése id alapján
        Route::get('/api/category/all/filter', [CategoryController::class, 'filterCategories']);  //alkategóriák szűrése megadott attr. alapján
        Route::get('/api/service/{id}/categories/filter', [CategoryController::class, 'filterCategoriesPerService']); //adott service alá tart. kategóriák v2.
        Route::get('/api/service/all/filter', [CategoryController::class, 'filterServices']);  //alkategóriák szűrése megadott attr. alapján

        /*Útvonalak resolverekhez*/
        Route::get('/api/resolver/{id}/users/filter', [ResolverController::class, 'filterUsersPerResolver']);  //adott megoldócsop. alá tartozó userek megadott attr. szerinti szűrése (csak aktív státuszúak)
        Route::get('/api/resolver/all/filter', [ResolverController::class, 'filter']); //támogatói csapatok szűrése megadott attribútum alapján

        /*Útvonalak a csatolmányokhoz kapcsolódóan*/
        Route::get('/api/attachment/all', [AttachmentController::class, 'getAllAttachments']);  //összes csatolmány
        Route::get('/api/ticket/{id}/attachments', [TicketController::class, 'getAttachmentsPerTicket']); //adott tickethez tart. csatolmányok
        Route::get('/api/attachment/{id}/ticket', [AttachmentController::class, 'getTicketPerAttachment']); //adott csatolmány mely tickethez tart. 
        Route::get('/api/attachment/{id}', [AttachmentController::class, 'getAttachment']);//adott csatolmány megkeresése id alapján
        Route::post('/api/attachment', [AttachmentController::class, 'store']); //új csatolmány rögzítése 

        /*Útvonalak userekhez --> ez a felület majd csak a database-eseknek lesz engedélyezett*/
        Route::get('/api/user/all', [UserController::class, 'getAllUsers']);  //összes user
        Route::get('/api/user/{id}', [UserController::class, 'getUser']);  //adott user megkeresése id alapján
        Route::get('/api/user/all/filter', [UserController::class, 'filter']);  //userek szűrése adott attr. alapján  
        Route::get('/api/user/all/active/filter', [UserController::class, 'filterActiveUsers']);  //aktív userek szűrése adott attr. alapján   
        Route::get('/api/user/all/filter/excauth', [UserController::class, 'filterExcAuth']);  //userek szűrése adott attr. alapján, kivéve a bejelentkezett usert 
        

        /*Útvonalak naplózáshoz*/
        Route::post('/api/journal/new', [JournalController::class, 'addNewJournal']);  //új naplóbejegyzés beszúrása

        Route::middleware(['auth', IsDbTeamMember::class])->group(function () {  
            //Útvonalak DB csapattagoknak
            Route::get('/switchboard/db', function () {return view('it.switchboardfordb');}); //ez majd csak a db-eseknek lesz elérhető https://stackoverflow.com/questions/65835538/laravel-8-register-user-while-logged-in
            Route::get('/newuser', function () { return view('newuser');});  //új user kreálása - DB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            Route::get('/modifyuser', function () { return view('it.modifyuser');});  // adott user update-lése formon keresztül
            Route::get('modifyuser', [ResolverController::class, 'loadResolvers'])
                    ->name('modifyuser');
            Route::put('/api/user/{id}', [UserController::class, 'update']); //user updateléséhez szüks. API útvonal

        });
});


});




require __DIR__.'/auth.php';

