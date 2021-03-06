<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();  
            $table->string('ticketnr',20)->nullable();  //az AB-ben való létrejöttekor mindig NULL, majd a végleges érték store metódus végén íródik be, mikor már a ticket obj. létrejött       
            $table->foreignId('caller')->constrained('users')->onDelete('cascade')->onUpdate('cascade'); ///bejelentő
            $table->foreignId('subjperson')->constrained('users')->onDelete('cascade')->onUpdate('cascade'); //érintett
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade')->onUpdate('cascade'); //nyitotta
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('cascade')->onUpdate('cascade'); //utoljára módosította
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('cascade')->onUpdate('cascade'); //kezeli
            $table->foreignId('parent_ticket')->nullable()->constrained('tickets')->onDelete('cascade')->onUpdate('cascade'); //kapcs. jegy     
            $table->foreignId('category')->constrained('categories')->onDelete('cascade')->onUpdate('cascade'); //(al)kategória
            $table->string('title'); //rövid leírás
            $table->text('description'); //leírás
            $table->tinyInteger('urgency'); //sürgősség
            $table->tinyInteger('priority'); //prioritás
            $table->tinyInteger('impact'); //súlyosság
            $table->string('contact_type',20); //bejelentési csatorna
            $table->string('status',20); //akt. állapot
            $table->string('type',15);   //inc. v. req.                       
            $table->dateTime('created_on', $precision = 0); //jegy létrejöttének dátuma
            $table->dateTime('updated', $precision = 0)->nullable(); //utolsó módosítás dátuma                     
            $table->timestamps();
        });

        DB::statement("ALTER TABLE tickets AUTO_INCREMENT = 1000000;"); //auto increment seed from 1000000
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickets');
    }
};
