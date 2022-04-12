<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Journal extends Model
{
    use HasFactory;

    protected $casts = [
        'created_on' => 'datetime:d-m-Y H:i:s',
        'updated' => 'datetime:d-m-Y H:i:s',
    ];

    //adott bejegyzéshez tart. ticket
public function ticket()
{
    return $this->belongsTo(Ticket::class);
}

}
