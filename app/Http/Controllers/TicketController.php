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
                'category_name' => $category->cat_name,
                'service_name' => $service->cat_name,
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
        $ticket->subjperson = $request->subjperson;
        $ticket->caller = $request->caller;      
        $ticket->contact_type = $request->contact_type;
        $ticket->status = $request->status;
        $ticket->type = $request->type;
        $ticket->service = $request->service;
        $ticket->category = $request->category;
        $ticket->created_on = Carbon::now()->format('d-m-Y');        
        $ticket->updated_by = $request->updated_by;
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
        } 
        if($request->type =="Incident"){
            $ticket->sla=72;  //3*24
            $ticket->time_left= 72;
        }        

        $ticket->save();  

        return Ticket::find($ticket->id);
    }

    
    public function generalSearch(Request $request)    {


        // $query=Ticket::query();

        // if($s = $request->input(key:'q')){

        //     $query->whereRaw(sql:"id LIKE '%" .$s."%'")            
        //     ->orWhereRaw(sql:"created_on LIKE '%" .$s."%'") 
        //     ->orWhereRaw(sql:"updated LIKE '%" .$s."%'")
        //     ->orWhereRaw(sql:"description LIKE '%" .$s."%'")
        //     ->orWhereRaw(sql:"title LIKE '%" .$s."%'")
        //     ;
        // }

        // return $query->get();


        //-------------

        $searchTerm=$request->query('q');
      
        $results=  Ticket::join('users', function($builder) {
            $builder->on('users.id', '=', 'tickets.caller');
            // here you can add more conditions on users table.
        })->join('categories', function($builder) {
            $builder->on('categories.id', '=', 'tickets.category');
            // here you can add more conditions on categories table.
        })->       
        
         where('tickets.id', 'LIKE', "%{$searchTerm}%") 
        ->orWhere('tickets.title', 'LIKE', "%{$searchTerm}%") 
        ->orWhere('tickets.description', 'LIKE', "%{$searchTerm}%") 
        ->orWhere('tickets.created_on', 'LIKE', "%{$searchTerm}%") 
        ->orWhere('tickets.updated', 'LIKE', "%{$searchTerm}%")       
        ->orWhere('categories.cat_name', 'LIKE', "%{$searchTerm}%")                   
        ->orWhere('tickets.status', 'LIKE', "%{$searchTerm}%")
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
                'category_name' => $category->cat_name,
                'service_name' => $service->cat_name,
                'status' => $ticket->status, 
                'created_on' =>  Carbon::createFromFormat('Y-m-d H:i:s', $ticket->created_on)->format('d-m-Y H:i:s'),   
                'updated' => Carbon::createFromFormat('Y-m-d H:i:s', $ticket->updated)->format('d-m-Y H:i:s'),   
                        
                );
                array_push($response,$data);          
            }

       
        return response()->json($response);

       // https://stackoverflow.com/questions/14463921/select-from-multiple-tables-with-laravel-fluent-query-builder --> ???
       //https://stackoverflow.com/questions/48406444/laravel-eloquent-search-inside-related-table

  
       
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
