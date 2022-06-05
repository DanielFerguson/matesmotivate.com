<?php

use App\Http\Controllers\GoalController;
use App\Http\Requests\StoreMentorRequest;
use App\Models\Goal;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

Route::inertia('/', 'home');

Route::middleware(['auth'])->group(function () {
    Route::get('/app', function () {
        return Inertia::render('app', [
            'goals' => Auth::user()->goals,
            'responsibilities' => Auth::user()->responsibilities
        ]);
    })->name('app');

    Route::resource('goals', GoalController::class)->except(['index', 'show']);

    Route::get('/goals/{goal}/checkin', function (Goal $goal) {
        $goal->checkin();
        Session::flash('message', 'This is a message!');

        return Redirect::route('app');
    });

    Route::post('/goals/{goal}/leave', function (Goal $goal) {
        $goal->mates()->detach(Auth::id());
        return Redirect::route('app');
    });

    Route::post('/goals/{goal}/encourage', function (Goal $goal) {
        $goal->encouragements()->create(['user_id' => Auth::id(), 'date' => Carbon::today()]);

        return Redirect::route('app');
    });

    Route::get('/goals/{goal}/mentors/add', function (Goal $goal) {
        return Inertia::render('goals/add-mentor', [
            'goal' => $goal
        ]);
    });

    Route::post('/goals/{goal}/mentors', function (StoreMentorRequest $request, Goal $goal) {
        if ($request->handle == Auth::user()->nickname) {
            return Inertia::render('goals/add-mentor', [
                'goal' => $goal,
                'message' => 'You cannot add yourself.'
            ]);
        }

        $user = User::where('nickname', $request->handle)->first();

        if ($user == null) {
            return Inertia::render('goals/add-mentor', [
                'goal' => $goal,
                'message' => 'We could not find that user.'
            ]);
        }

        $goal->mates()->attach($user);

        return Redirect::route('app');
    });
});

Route::prefix('auth')->group(function () {
    Route::get('/twitter/redirect', fn () => Socialite::driver('twitter')->redirect());
    Route::get('/twitter/callback', function () {
        $twitter_user = Socialite::driver('twitter')->user();

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
