<?php

use App\Models\Goal;
use App\Models\User;
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
        Schema::create('encouragements', function (Blueprint $table) {
            $table->primary(['user_id', 'goal_id', 'date']);
            $table->foreignIdFor(Goal::class);
            $table->foreignIdFor(User::class);
            $table->date('date');
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
        Schema::dropIfExists('encouragements');
    }
};
