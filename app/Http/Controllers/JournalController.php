<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;


use App\Models\Journal;
use Carbon\Carbon;
use Illuminate\Http\Request;

class JournalController extends Controller
{
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
    public function addNewJournal(Request $request)
    {  // dd($request->all());
       // parse_str($request->getContent(),$arrayToProcess); //json_decode($request->getContent(), true);
       $arrayToProcess=request('data');
            
        foreach ($arrayToProcess as $journal) {
            $j  =   new Journal();
            $j->comment = $journal['description'] ; 
            $j->ticketid= $journal['ticketid']; 
            $j->caller= $journal['caller_id']; 
            $j->subjperson= $journal['subjperson_id']; 
            $j->assignedto= $journal['assigned_to_id']; 
          //  $j->category= $journal['category_id']; 
          //$j->priority= $journal['priority'];
          //$j->urgency= $journal['urgency'];
          // $j->impact= $journal['impact'];
            $j->status= $journal['status'];
            $j->updatedby = Auth::user()->id;
            $j->updated = Carbon::now()->format('Y-m-d H:i:s');         
            $j->save();
        }

        
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function show(Journal $journal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function edit(Journal $journal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Journal $journal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Journal  $journal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Journal $journal)
    {
        //
    }
}
