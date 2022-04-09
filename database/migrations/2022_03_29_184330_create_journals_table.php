<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ticketid')->constrained('tickets')->onDelete('cascade')->onUpdate('cascade'); //ha van ticketnr, akkor lehet, nem is kell az id?           
            $table->bigInteger('caller');
            $table->bigInteger('subjperson');           
            $table->bigInteger('updatedby');
            $table->bigInteger('assignedto');
            $table->string('status');
            $table->dateTime('updated');
            $table->timestamps();
            $table->text('comment'); //nem nullable; minden módosításnál kötelező a komment
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('journals');
    }
};
