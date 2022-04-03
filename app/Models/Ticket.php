<?php

namespace App\Models;

use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Ticket extends Model
{
    use HasFactory;

  
    /*DÁTUMKONVERZIÓS LEHETŐSÉGEK*/

     // custom timestamp column names
   // const CREATED_AT = 'created_on';
    //const UPDATED_AT = 'updated';

   // dátum formátum testreszabása attribútumonként
    protected $casts = [
        'created_on' => 'datetime:d-m-Y', // Change your format
        'updated' => 'datetime:d-m-Y',
    ];

    // public function getCreatedOntAttribute($date) {
    //     return Carbon::createFromFormat('Y-m-d H:i:s', $date)->format('H:i:s'); //https://stackoverflow.com/questions/42071525/how-to-extract-the-time-from-created-at-with-carbon
    // }



    //adott tickethez tart. bejelentő
    public function caller()
    {
        return $this->belongsTo(User::class,'caller');
    }

     //adott tickethez tart. érintett user
     public function affected_user()
     {
         return $this->belongsTo(User::class,'subjperson');
     }

      //adott tickethez tart. rögzítő személy
      public function created_by()
      {
          return $this->belongsTo(User::class,'created_by');
      }

      //adott tickethez tart. utolsó módosító személy
      public function updated_by()
      {
          return $this->belongsTo(User::class,'updated_by');
      }

      //akihez rendelve van az adott ticket
      public function assigned_to()
      {
          return $this->belongsTo(User::class,'assigned_to');
      }


      //adott ticket kategóriája
      public function category()

      {
          return $this->belongsTo(Category::class);
      }

      //adott tickethez tart. csatolmányok
         public function attachments()
         {
             return $this->hasMany(Attachment::class);
         }
  
      
     
     //rekurzív kapcsolat -->$this->hasMany(Class,parentID,childID)
    //adott ticket alatti child ticketeket adja vissza
    public function childTickets()
    {
        return $this->hasMany(Ticket::class,'parent_ticket','id');
    }

    //a child tickethez tart. fő ticketet adja vissza:
    public function majorTicket()
    {
        return $this->belongsTo(Ticket::class,'parent_ticket','id'); 
    }
      
    

}
