<?php

namespace App\Models;

use Carbon\Carbon;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Goal extends Model
{
    use HasFactory;

    protected $appends = ['check_in_today', 'track_record'];

    protected $with = ['checkins', 'mates', 'user'];

    protected $fillable = [
        'user_id',
        'cadence',
        'action',
        'streak_goal',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mates(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function checkins(): HasMany
    {
        return $this->hasMany(CheckIn::class);
    }

    public function getCheckInTodayAttribute()
    {
        return !$this->checkins()->whereDate('date', Carbon::today())->exists();
    }

    public function getTrackRecordAttribute()
    {
        $start_date = $this->created_at;

        $period = new DatePeriod(
            new DateTime($start_date),
            new DateInterval('P1D'),
            new DateTime($this->created_at->addDay($this->streak_goal))
        );

        $dates = [];

        foreach ($period as $key => $value) {
            $dates[] = $value;
        }

        return collect($dates)->map(function ($date) {
            return [
                'date' => $date->format('Y-m-d'),
                'passed' => $date < Carbon::today(),
                'checked_in' => $this->checkins->contains('date', $date->format('Y-m-d'))
            ];
        });
    }

    public function checkin(): void
    {
        $this->checkins()->create([
            'date' => Carbon::today(),
            'entry' => true
        ]);
    }
}
