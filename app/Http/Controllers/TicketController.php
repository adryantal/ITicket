<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

use App\Models\Ticket;
use App\Models\User;
use App\Models\Category;
use App\Models\Resolver;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isNull;

class TicketController extends Controller
{
  
    //összes ticket
    public function getAllTickets()
        {
       $response=array();
        $alltickets = Ticket::all();
        foreach ($alltickets as $ticket) {           
            $updated_by=User::find($ticket->updated_by);
            $category=Category::find($ticket->category);
            $service=Category::where('id','=',$category->main_cat_id)->first();            
            if($ticket->type=="Request"){
                $prefix='REQ';
            };
            if($ticket->type=="Incident"){
                $prefix='INC';
            };
            //Carbon::resetToStringFormat();
            $data = array(
                'id'=> $prefix.$ticket->id,
                'caller_name' => User::find($ticket->caller)->name, 
                'subjperson_name' => User::find($ticket->subjperson)->name, 
                'assigned_to_name' => User::find($ticket->assigned_to)->name, 
                'created_by_name'=>User::find($ticket->created_by)->name, 
                'updated_by_name'=>$updated_by === null ? "" : $updated_by->name,
                'title' => $ticket->title,
                'type' => $ticket->type,              
                'category_name' => $category->name,
                'service_name' => $service->name,
                'status' => $ticket->status, 
                'created_on' =>  Carbon::create($ticket->created_on)->format('d-m-Y H:i:s'),  // !!!
                'updated' => Carbon::create($ticket->updated)->format('d-m-Y H:i:s'),   //!!!                
                        
                );
                array_push($response,$data);
            }

       
        return response()->json($response);
    }

    //adott ticket megkeresése id alapján
    public function getTicket($ticketid)
    {
        $attachment = Ticket::find($ticketid);
        return $attachment;
    }

    //adott tickethez tart. csatolmányok
    public function getAttachmentsPerTicket($ticketid)
    {
        $ticket = Ticket::find($ticketid);
        $attachments = $ticket->attachments;
        return $attachments;
    }

    //adott ticket bejelentője
    public function getCaller($ticketid)
    {
        $ticket = Ticket::find($ticketid);
        $caller = $ticket->caller;
        return $caller;
    }

    //adott ticket érintett személye
    public function getAffectedUser($ticketid)
    {
        $ticket = Ticket::find($ticketid);
        $affected_user = $ticket->affected_user;
        return $affected_user;
    }

    //adott ticket rögzítője
    public function getCreatedBy($ticketid)
    {
        $ticket = Ticket::find($ticketid);
        $created_by = $ticket->created_by;
        return $created_by;
    }

    //adott ticket kezelője
    public function getAssignedTo($ticketid)
    {
        $ticket = Ticket::find($ticketid);
        $assigned_to = $ticket->assigned_to;
        return $assigned_to;
    }


    //aki egy adott ticketet utoljára módosított
    //adott ticket kezelője
    public function getUpdatedBy($ticketid)
    {
        $ticket = Ticket::find($ticketid);
        $updated_by = $ticket->updated_by;
        return $updated_by;
    }


      //adott ticket. alá tart. child ticketek
      public function getAllChildTickets($ticketid){
        $child_tickets = Ticket::where('parent_ticket','=',$ticketid)
        ->orderBy('parent_ticket')       
        ->get();
        return response()->json($child_tickets);
    }

//a nem változtatható ticketadatok kilistázása ticketszám alapján
   public function retrieveConstTicketData($ticketNr){
  
       $ticket=Ticket::where('ticketnr','=',$ticketNr)->first(); 
       $updated_by=User::where('id','=',$ticket->updated_by)->first();    
       $now=Carbon::now();
       $created_on=Carbon::create($ticket->created_on);
       $timespent= $now->diffInHours($created_on, true); 
       $timeleft=$ticket->sla-$timespent;      
        //egy array-t készítek elő, amelyet majd a ticketadatok betöltéséhez átküldök a modifyticket oldalnak session-ön keresztül
       $data = array(
        'id'=> $ticket->id,
        'ticketnr'=> $ticket->ticketnr,
        'created_by_name'=>User::where('id','=',$ticket->created_by)->first()->name, 
        'updated_by_name'=>$updated_by === null ? "" : $updated_by->name,        
        'created_on' =>  Carbon::create($ticket->created_on)->format('d-m-Y H:i:s'),   
        'updated' => Carbon::create($ticket->updated)->format('d-m-Y H:i:s'),   
        'sla' => $ticket->sla, 
        'timeleft' => $timeleft,
        'timespent' => $timespent,                
        );    
      return redirect('/modifyticket')->with('data', $data);
   }




//a modify ticket formba történő adatbetöltéshez
   public function dataforModifyTicketForm($ticketNr){

    $ticket=Ticket::where('ticketnr','=',$ticketNr)->first(); 
    $updated_by=User::find($ticket->updated_by);
    $category=Category::find($ticket->category);    
    $now=Carbon::now();
    $parent_ticket=Ticket::find($ticket->parent_ticket);    
    $created_on=Carbon::create($ticket->created_on);
    $timespent= $now->diffInHours($created_on, true); 
    $timeleft=$ticket->sla-$timespent;
    $assignment_group_id = User::find($ticket->assigned_to)->first()->resolver_id;     

    $data = array(
     'id'=> $ticket->id,
     'ticketnr'=> $ticket->ticketnr,
     'caller_name' => User::find($ticket->caller)->name, 
     'subjperson_name' => User::find($ticket->subjperson)->name, 
     'assigned_to_name' => User::find($ticket->assigned_to)->name, 
     'assignment_group_name' => Resolver::find($assignment_group_id)->name,
     'created_by_name'=>User::where('id','=',$ticket->created_by)->first()->name, 
     'updated_by_name'=>$updated_by === null ? "" : $updated_by->name,
     'title' => $ticket->title,
     'description' => $ticket->description,
     'type' => $ticket->type,            
     'contact_type' => $ticket->contact_type,    
     'category_name' => $category->name,
     'service_name' => Category::find($category->main_cat_id)->name,
     'status' => $ticket->status, 
     'created_on' =>  Carbon::create($ticket->created_on)->format('d-m-Y H:i:s'),   
     'updated' => Carbon::create($ticket->updated)->format('d-m-Y H:i:s'),   
     'sla' => $ticket->sla, 
     'timeleft' => $timeleft,
     'timespent' => $timespent, 
     'impact' => $ticket->impact,
     'priority' => $ticket->priority,   
     'urgency' => $ticket->urgency,
     'parent_ticketnr' =>   $parent_ticket === null ? "" : $parent_ticket->ticketnr,    
     //ezeket azért kell átadni, hogy ha esetleg nem kerül sor az adott mező értékének megváltoztatására:
     'caller_id' => User::find($ticket->caller)->id, 
     'subjperson_id' => User::find($ticket->subjperson)->id, 
     'assigned_to_id' => User::find($ticket->assigned_to)->id, 
     'assignment_group_id' => Resolver::find($assignment_group_id)->id,
     'category_id' => $category->id,
     'service_id' => Category::find($category->main_cat_id)->id,

     );
   
    return $data;
   }

   

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }




    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)    {

        $ticket = new Ticket();
        $ticket->subjperson = $request->subjperson_id;
        $ticket->caller = $request->caller_id;      
        $ticket->contact_type = $request->contact_type;
        $ticket->status = $request->status;
        $ticket->type = $request->type;     
        $ticket->category = $request->category_id;
        $ticket->created_on = Carbon::now()->format('Y-m-d H:i:s');        
        $ticket->updated_by = $request->updated_by_id;
        $ticket->created_by = Auth::user()->id; //a belogolt user
        $ticket->assigned_to = Auth::user()->id; //első körben ahhoz a helpdeskeshez legyen assignolva, aki nyitotta
        $ticket->title = ucfirst($request->title); //első betű nagy betű --> rendezés miatt fontos
        $ticket->description = ucfirst($request->description);
        $ticket->priority = $request->priority;
        $ticket->urgency = $request->urgency;
        $ticket->impact = $request->impact;
        $ticket->parent_ticket = $request->parent_ticket;
        $ticket->updated=Carbon::now()->format('Y-m-d H:i:s');
       //sla && time left
        if($request->type =="Request"){
            $ticket->sla=120; //5*24
            $ticket->time_left= 120;
            $prefix='REQ';
        } 
        if($request->type =="Incident"){
            $ticket->sla=72;  //3*24
            $ticket->time_left= 72;
            $prefix='INC';
        }   

        $ticket->save();  

       //ticket number mező kitöltése
        $newticket=Ticket::find($ticket->id);      
        Ticket::where('id', $newticket->id)->update(['ticketnr' => $prefix.$newticket->id]); //https://stackoverflow.com/questions/35279933/update-table-using-laravel-model
        return Ticket::find($ticket->id); 
    }

    public function getLastTicketSubmittedByAuthUser(){
   
     $ticket = Ticket::where('created_by','=', Auth::user()->id)->orderBy('created_on', 'DESC')->firstOrFail();

     return response()->json ($ticket);
    }





//a megadott attribútumok értékei között keres
    public function filter(Request $request)    {
        $queryString = $request->query();

        $results = Ticket::leftJoin('users AS subjperson_user', 'subjperson', '=', 'subjperson_user.id') //a tickets összekapcs. a users táblával a subjperson attr. keresztül
                         ->leftJoin('users AS caller_user', 'caller', '=', 'caller_user.id')
                         ->leftJoin('users AS created_by_user', 'created_by', '=', 'created_by_user.id')
                         ->leftJoin('users AS updated_by_user', 'updated_by', '=', 'updated_by_user.id')
                         ->leftJoin('users AS assigned_to_user', 'assigned_to', '=', 'assigned_to_user.id')
                         ->leftJoin('categories AS CS', function($leftJoin)
                         {
                             $leftJoin->on('CS.id', '=', 'tickets.category')  //a CS tábla (Category-Sub) az alkategóriákat reprezentálja
                                 ->whereNotNull('CS.main_cat_id' );
                         })
                        ->leftJoin('categories AS CM', function($leftJoin)        {  //a CM tábla (Category-Main) a főkategórákat reprezentálja
                             $leftJoin->on('CM.id', '=', 'CS.main_cat_id')       //a főkat. tábla összekapcs. az alkat. táblával, ahol a "főkategóriája" mező NULL
                                 ->whereNull('CM.main_cat_id');
                         })
                          ->select('tickets.id', 'caller' ,'subjperson' ,'assigned_to' ,'created_by' ,'updated_by' ,'category','title' ,'type' ,'status' ,'created_on' ,'updated');
                          
        foreach ($queryString as $key => $value) {
            $explodedKey=explode('?',$key); //példa: key: 'id?like', expression: '101'; explode using separator '?'
            $attribute=$explodedKey[0];
            $expression=$explodedKey[1];
            switch ($attribute) {
                case 'id':
                    $attribute='tickets.ticketnr'; //kivételesen itt a ticket number-ban keressen, ne az id-k között
                  break;
                case 'caller_name':
                    $attribute='caller_user.name';
                  break;   
                  case 'subjperson_name':
                    $attribute='subjperson_user.name';
                  break;  
                  case 'created_by_name':
                    $attribute='created_by_user.name';
                  break;  
                  case 'updated_by_name':
                    $attribute='updated_by_user.name';
                  break;     
                  case 'assigned_to_name':
                    $attribute='assigned_to_user.name';
                  break; 
                  case 'title':
                    $attribute='tickets.title';
                  break;  
                  case 'created_on':
                    $attribute='tickets.created_on';
                  break;  
                  case 'updated':
                    $attribute='tickets.updated';
                  break;
                  case 'type':
                    $attribute='tickets.type';
                  break;  
                  case 'status':
                    $attribute='tickets.status';
                  break; 
                  case 'category_name':
                    $attribute='CS.name';
                  break;  
                  case 'service_name':
                    $attribute='CM.name';
                  break;      
                
                default:
                    ;                 
              }

            $results=$results->where($attribute, $expression, '%' . $value . '%');           
        }
        $results=$results->get();
        
        $response=array();
       
        foreach ($results as $ticket) {          
         
            $updated_by=User::find($ticket->updated_by);
            $category=Category::find($ticket->category);
            $service=Category::where('id','=',$category->main_cat_id)->first();
            
            if($ticket->type=="Request"){
                $prefix='REQ';
            };
            if($ticket->type=="Incident"){
                $prefix='INC';
            };
            $data = array(
                'id'=> $prefix.$ticket->id,
                'caller_name' => User::find($ticket->caller)->name, 
                'subjperson_name' => User::find($ticket->subjperson)->name, 
                'assigned_to_name' => User::find($ticket->assigned_to)->name, 
                'created_by_name'=>User::find($ticket->created_by)->name, 
                'updated_by_name'=>$updated_by === null ? "" : $updated_by->name,
                'title' => $ticket->title,
                'type' => $ticket->type,              
                'category_name' => $category->name,
                'service_name' => $service->name,
                'status' => $ticket->status, 
                'created_on' =>  Carbon::create($ticket->created_on)->format('d-m-Y H:i:s'),   
                'updated' => Carbon::create($ticket->updated)->format('d-m-Y H:i:s'),   
                        
                );
                array_push($response,$data);          
            }
     
        return response()->json($response);
    }




    //a csak a ticket táblában keres megadott attribútumra (nincs join a többi táblával)
    public function search(Request $request)
    {
        $queryString = $request->query();
        foreach ($queryString as $key => $value) {
            $explodedKey=explode('_',$key); //explode using separator '_'
            $attribute=$explodedKey[0];
            $expression=$explodedKey[1];
            $results=Ticket::where($attribute, $expression, '%' . $value . '%')->get();
        }
        return $results;
    }
    //összes ticket kivéve a kijelölt
    public function allTicketsExceptCurrent($ticketnr)
    {
        $results = Ticket::where('ticketnr', 'not like', '%' . $ticketnr . '%')->get();
        return $results;
    }


    

  //az összes attr. értékei között keres
    public function generalSearch(Request $request)    {

        $searchTerm=$request->query('q');
      
        //alias nélkül nem működik, tehát pl. users AS subjperson_user!!!
        $results = Ticket::leftJoin('users AS subjperson_user', 'subjperson', '=', 'subjperson_user.id') //a tickets összekapcs. a users táblával a subjperson attr. keresztül
                         ->leftJoin('users AS caller_user', 'caller', '=', 'caller_user.id')
                         ->leftJoin('users AS created_by_user', 'created_by', '=', 'created_by_user.id')
                         ->leftJoin('users AS updated_by_user', 'updated_by', '=', 'updated_by_user.id')
                         ->leftJoin('users AS assigned_to_user', 'assigned_to', '=', 'assigned_to_user.id')
                         ->leftJoin('categories AS CS', function($leftJoin)
                         {
                             $leftJoin->on('CS.id', '=', 'tickets.category')  //a CS tábla (Category-Sub) az alkategóriákat reprezentálja
                                 ->whereNotNull('CS.main_cat_id' );
                         })
                        ->leftJoin('categories AS CM', function($leftJoin)        {  //a CM tábla (Category-Main) a főkategórákat reprezentálja
                             $leftJoin->on('CM.id', '=', 'CS.main_cat_id')       //a főkat. tábla összekapcs. az alkat. táblával, ahol a "főkategóriája" mező NULL
                                 ->whereNull('CM.main_cat_id');
                         })
                          ->select('tickets.id', 'caller' ,'subjperson' ,'assigned_to' ,'created_by' ,'updated_by' ,'category'   ,'title' ,'type' ,'status' ,'created_on' ,'updated')
                          ->where('subjperson_user.name', 'LIKE', "%{$searchTerm}%") 
                          ->orWhere('caller_user.name', 'LIKE', "%{$searchTerm}%") 
                          ->orWhere('updated_by_user.name', 'LIKE', "%{$searchTerm}%") 
                         ->orWhere('assigned_to_user.name', 'LIKE', "%{$searchTerm}%") 
                          ->orWhere('updated_by_user.name', 'LIKE', "%{$searchTerm}%")     
                          ->orWhere('created_by_user.name', 'LIKE', "%{$searchTerm}%")    
                          ->orWhere('CS.name', 'LIKE', "%{$searchTerm}%")                                           
                          ->orWhere('CM.name', 'LIKE', "%{$searchTerm}%")
                          ->orWhere('description', 'LIKE', "%{$searchTerm}%")
                          ->orWhere('title', 'LIKE', "%{$searchTerm}%")
                          ->orWhere('updated', 'LIKE', "%{$searchTerm}%")
                          ->orWhere('created_on', 'LIKE', "%{$searchTerm}%")
                          ->orWhere('status', 'LIKE', "%{$searchTerm}%")
                          ->orWhere('type', 'LIKE', "%{$searchTerm}%")
                          ->orWhere('tickets.ticketnr', 'LIKE', "%{$searchTerm}%") //a ticket numberek között keressen, ne az id-k között!
                        ->get();


                        $response=array();
       
                        foreach ($results as $ticket) {   
                            
                            $updated_by=User::find($ticket->updated_by);
                            $category=Category::find($ticket->category);
                            $service=Category::where('id','=',$category->main_cat_id)->first();
                            
                            if($ticket->type=="Request"){
                                $prefix='REQ';
                            };
                            if($ticket->type=="Incident"){
                                $prefix='INC';
                            };
                
                            $data = array(
                                'id'=> $prefix.$ticket->id,
                                'caller_name' =>  User::find($ticket->caller)->name, 
                                'subjperson_name' => User::find($ticket->subjperson)->name, 
                                'assigned_to_name' => User::find($ticket->assigned_to)->name, 
                                'created_by_name'=>User::find($ticket->created_by)->name, 
                                'updated_by_name'=>$updated_by === null ? "" : $updated_by->name,
                                'title' => $ticket->title,
                                'type' => $ticket->type,              
                                'category_name' => $category->name,
                                'service_name' => $service->name,
                                'status' => $ticket->status, 
                                'created_on' =>  Carbon::create($ticket->created_on)->format('d-m-Y H:i:s'),   
                                'updated' => Carbon::create($ticket->updated)->format('d-m-Y H:i:s'),   
                                        
                                );
                                array_push($response,$data);          
                            }
                
                       
                        return response()->json($response);       
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)   
    
    {        
        $ticket = Ticket::find($id);        
                              
        $ticket->title = $request->title;
        $ticket->description = $request->description;
        $ticket->status = $request->status;   
        $ticket->type = $request->type;  
        $ticket->caller = $request->caller_id;         
        $ticket->subjperson = $request->subjperson_id;
        $ticket->assigned_to = $request->assigned_to_id; 
        $ticket->updated  =  Carbon::now()->format('Y-m-d H:i:s');  
        $ticket->updated_by  = Auth::user()->id;
        $ticket->category  = $request->category_id;        
        $ticket->contact_type =  $request->contact_type;
        $ticket->urgency =  $request->urgency;
        $ticket->priority =  $request->priority;
        $ticket->impact =  $request->impact;

        if (!isNull($request->parent_ticket_id)){ $ticket->parent_ticket =  $request->parent_ticket_id;}  
        $ticket->save();          
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
