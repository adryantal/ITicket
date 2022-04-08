<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Models\Ticket;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;

class TicketController extends Controller
{
  
    //összes ticket
    public function getAllTickets()
        {
       $response=array();
        $alltickets = Ticket::all();
        foreach ($alltickets as $ticket) {
            $caller=User::find($ticket->caller);
            $subjperson=User::find($ticket->subjperson);
            $assigned_to=User::find($ticket->assigned_to);
            $created_by=User::find($ticket->created_by);
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
                'caller_name' => $caller->name, 
                'subjperson_name' => $subjperson->name, 
                'assigned_to_name' => $assigned_to->name, 
                'created_by_name'=>$created_by->name, 
                'updated_by_name'=>$updated_by === null ? "" : $updated_by->name,
                'title' => $ticket->title,
                'type' => $ticket->type,              
                'category_name' => $category->name,
                'service_name' => $service->name,
                'status' => $ticket->status, 
                'created_on' =>  Carbon::createFromFormat('Y-m-d H:i:s', $ticket->created_on)->format('d-m-Y H:i:s'),   
                'updated' => Carbon::createFromFormat('Y-m-d H:i:s', $ticket->updated)->format('d-m-Y H:i:s'),   
                        
                );
                array_push($response,$data);
            }

       
        return response()->json($response);
    }

    //adott ticket megkeresése id alapján
    public function getTicket($ticket_id)
    {
        $attachment = Ticket::find($ticket_id);
        return $attachment;
    }

    //adott tickethez tart. csatolmányok
    public function getAttachmentsPerTicket($ticket_id)
    {
        $ticket = Ticket::find($ticket_id);
        $attachments = $ticket->attachments;
        return $attachments;
    }

    //adott ticket bejelentője
    public function getCaller($ticket_id)
    {
        $ticket = Ticket::find($ticket_id);
        $caller = $ticket->caller;
        return $caller;
    }

    //adott ticket érintett személye
    public function getAffectedUser($ticket_id)
    {
        $ticket = Ticket::find($ticket_id);
        $affected_user = $ticket->affected_user;
        return $affected_user;
    }

    //adott ticket rögzítője
    public function getCreatedBy($ticket_id)
    {
        $ticket = Ticket::find($ticket_id);
        $created_by = $ticket->created_by;
        return $created_by;
    }

    //adott ticket kezelője
    public function getAssignedTo($ticket_id)
    {
        $ticket = Ticket::find($ticket_id);
        $assigned_to = $ticket->assigned_to;
        return $assigned_to;
    }


    //aki egy adott ticketet utoljára módosított
    //adott ticket kezelője
    public function getUpdatedBy($ticket_id)
    {
        $ticket = Ticket::find($ticket_id);
        $updated_by = $ticket->updated_by;
        return $updated_by;
    }


      //adott ticket. alá tart. child ticketek
      public function getAllChildTickets($ticket_id){
        $$child_tickets = Ticket::where('parent_ticket','=',$ticket_id)
        ->orderBy('parent_ticket')       
        ->get();
        return response()->json($child_tickets);
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
        $ticket->service = $request->service_id;
        $ticket->category = $request->category_id;
        $ticket->created_on = Carbon::now()->format('d-m-Y');        
        $ticket->updated_by = $request->updated_by_id;
        $ticket->created_by = Auth::user()->id; //a belogolt user
        $ticket->assigned_to = Auth::user()->id; //első körben ahhoz a helpdeskeshez legyen assignolva, aki nyitotta
        $ticket->title = $request->title;
        $ticket->description = $request->description;
        $ticket->priority = $request->priority;
        $ticket->urgency = $request->urgency;
        $ticket->impact = $request->impact;
        $ticket->parent_ticket = $request->parent_ticket;
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
        $t=Ticket::find($ticket->id);
        $ticket_number = $prefix.$t->ticket_id;
        Ticket::where('id', $t->id)->update(['ticket_number' => $ticket_number]); //https://stackoverflow.com/questions/35279933/update-table-using-laravel-model

        return Ticket::find($ticket->id);
    }


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
            $explodedKey=explode('?',$key); //példa: key: 'id_like', expression: '101'
            $attribute=$explodedKey[0];
            $expression=$explodedKey[1];
            switch ($attribute) {
                case 'id':
                    $attribute='tickets.id';
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
            $caller=User::find($ticket->caller);
            $subjperson=User::find($ticket->subjperson);
            $assigned_to=User::find($ticket->assigned_to);
            $created_by=User::find($ticket->created_by);
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
                'caller_name' => $caller->name, 
                'subjperson_name' => $subjperson->name, 
                'assigned_to_name' => $assigned_to->name, 
                'created_by_name'=>$created_by->name, 
                'updated_by_name'=>$updated_by === null ? "" : $updated_by->name,
                'title' => $ticket->title,
                'type' => $ticket->type,              
                'category_name' => $category->name,
                'service_name' => $service->name,
                'status' => $ticket->status, 
                'created_on' =>  Carbon::createFromFormat('Y-m-d H:i:s', $ticket->created_on)->format('d-m-Y H:i:s'),   
                'updated' => Carbon::createFromFormat('Y-m-d H:i:s', $ticket->updated)->format('d-m-Y H:i:s'),   
                        
                );
                array_push($response,$data);          
            }

       
        return response()->json($response);

    }

    
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
                          ->orWhere('tickets.id', 'LIKE', "%{$searchTerm}%")
                        ->get();


                        $response=array();
       
                        foreach ($results as $ticket) {            
                            $caller=User::find($ticket->caller);
                            $subjperson=User::find($ticket->subjperson);
                            $assigned_to=User::find($ticket->assigned_to);
                            $created_by=User::find($ticket->created_by);
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
                                'caller_name' => $caller->name, 
                                'subjperson_name' => $subjperson->name, 
                                'assigned_to_name' => $assigned_to->name, 
                                'created_by_name'=>$created_by->name, 
                                'updated_by_name'=>$updated_by === null ? "" : $updated_by->name,
                                'title' => $ticket->title,
                                'type' => $ticket->type,              
                                'category_name' => $category->name,
                                'service_name' => $service->name,
                                'status' => $ticket->status, 
                                'created_on' =>  Carbon::createFromFormat('Y-m-d H:i:s', $ticket->created_on)->format('d-m-Y H:i:s'),   
                                'updated' => Carbon::createFromFormat('Y-m-d H:i:s', $ticket->updated)->format('d-m-Y H:i:s'),   
                                        
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
    public function update(Request $request, Ticket $ticket)
    {
        //
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
