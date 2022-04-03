<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;

    //amely tickethez tartozik az adott csatolmány
    public function ticket()  {
        return $this->belongsTo(Ticket::class);
    }
}
