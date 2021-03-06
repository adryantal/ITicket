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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('ad_id',20)->unique()->unique();
            $table->string('name',100);
            $table->string('phone_number',20);
            $table->string('email',35)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('department',40);
            $table->boolean('active')->default(true);
            $table->foreignId('resolver_id')->nullable()->constrained('resolvers')->onDelete('cascade')->onUpdate('cascade');            
            $table->rememberToken();
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
        DB::statement('SET FOREIGN_KEY_CHECKS = 0'); //*** a refresh miatt - foreign key constraint ignorálása       
        Schema::drop('users');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1'); //*** a refresh miatt - foreign key constraint
       // Schema::dropIfExists('users');
        
    }
};
