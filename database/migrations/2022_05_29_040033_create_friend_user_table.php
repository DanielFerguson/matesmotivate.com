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
        Schema::create('friend_user', function (Blueprint $table) {
            $table->primary(['user_id', 'friend_id', 'goal_id']);
            $table->foreignIdFor(User::class, 'user_id');
            $table->foreignIdFor(User::class, 'friend_id');
            $table->foreignIdFor(Goal::class);
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
        Schema::dropIfExists('friend_user');
    }
};
