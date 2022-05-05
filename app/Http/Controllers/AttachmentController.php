<?php

namespace App\Http\Controllers;


use App\Models\Attachment;
use Illuminate\Http\Request;

class AttachmentController extends Controller
{
  //adott csatolmány megkeresése id alapján
    public function getAttachment($att_id) {
        $attachment = Attachment::find($att_id);
        return $attachment;
    }

    //adott csatolmány mely tickethez tart.    
    public function getTicketPerAttachment($att_id)
    {
        $attachment = Attachment::find($att_id);
        $ticket = $attachment->ticket; 
        return response()->json($ticket);
    }

    //összes csatolmány
    public function getAllAttachMents()
    {
        return response()->json(Attachment::all());
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

     //új csatolmány feltöltése (a módosító formon keresztül)
    public function store(Request $request)    {    
        if(!($request->file('attachments')===null)){
            foreach ($request->file('attachments') as $attachment) {            
                $newAtt = new Attachment();
                $newAtt->ticketid =  substr($request->ticketID,3);
                $newAtt->name = $attachment->getClientOriginalName();           
                $newAtt->path = $attachment->storeAs(substr($request->ticketID,3), $attachment->getClientOriginalName(),"attachments"); // storage/app//attachments
                $newAtt->type= $attachment->extension();
                $newAtt->save();
            }
        }
    }

//létező csatolmány törlése (a módosító formon keresztül)
    public function removeAttachment(Request $request)  {       
       $array=json_decode($request->getContent(), true);
         foreach ($array as $key => $value) {
             Attachment::find($value)->delete();
         }        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Http\Response
     */
    public function show(Attachment $attachment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Http\Response
     */
    public function edit(Attachment $attachment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Attachment $attachment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attachment  $attachment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Attachment $attachment)
    {
        //
    }
}
