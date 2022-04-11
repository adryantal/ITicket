<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasFactory;

    //adott bejegyzéshez tart. ticket
public function ticket()
{
    return $this->belongsTo(Ticket::class);
}

}
