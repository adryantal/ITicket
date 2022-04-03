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
        Schema::create('category_resolver', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('resolver_id');           
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('resolver_id')->references('id')->on('resolvers')->onDelete('cascade')->onUpdate('cascade');        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category_resolver');
    }
};
