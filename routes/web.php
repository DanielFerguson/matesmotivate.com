<?php

use App\Http\Controllers\GoalController;
use App\Models\User;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::view('/', 'welcome');

Route::middleware(['auth'])->group(function () {
    Route::inertia('/app', 'app')->name('app');
    Route::resource('goals', GoalController::class)->except(['index', 'show']);
});

Route::prefix('auth')->group(function () {
    Route::get('/twitter/redirect', fn () => Socialite::driver('twitter')->redirect());
    Route::get('/twitter/callback', function () {
        $twitter_user = Socialite::driver('twitter')->user();

        ray($twitter_user);

        $user = User::updateOrCreate([
            'twitter_id' => $twitter_user->id,
        ], [
            'name' => $twitter_user->name,
            'email' => $twitter_user->email,
            'avatar' => $twitter_user->avatar,
            'nickname' => $twitter_user->nickname,
            'twitter_token' => $twitter_user->token,
            'twitter_refresh_token' => $twitter_user->tokenSecret,
        ]);

        Auth::login($user);

        return redirect('/app');
    });
});

require __DIR__ . '/auth.php';
