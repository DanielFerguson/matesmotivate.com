<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Encouragement extends Model
{
    use HasFactory;

    protected $with = ['user'];

    protected $primaryKey = null;
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'goal_id',
        'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
