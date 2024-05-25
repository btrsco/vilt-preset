<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Metric extends Model
{
    protected $fillable
        = [
            'measurable',
            'key',
            'value',
            'year',
            'month',
        ];

    public function measurable(): MorphTo
    {
        return $this->morphTo();
    }
}
