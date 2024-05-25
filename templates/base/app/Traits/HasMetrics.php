<?php

namespace App\Traits;

use App\Models\Metric;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasMetrics
{
    /**
     * Get the metrics for the model.
     *
     * @return MorphMany
     */
    public function metrics(): MorphMany
    {
        return $this->morphMany(Metric::class, 'measurable');
    }

    /**
     * Increment a metric by a given value.
     *
     * @param mixed    $key
     * @param int      $value
     * @param int|null $year
     * @param int|null $month
     *
     * @return void
     */
    public function incrementMetric(mixed $key, int $value = 1, ?int $year = null, ?int $month = null): void
    {
        $key = is_enum($key) ? $key->value : $key;

        $this->metrics()->firstOrCreate([
            'key'   => $key,
            'year'  => $year ?? now()->year,
            'month' => $month ?? now()->month,
        ], [
            'value' => 0,
        ])->increment('value', $value);
    }

    /**
     * Decrement a metric by a given value.
     *
     * @param mixed    $key
     * @param int      $value
     * @param int|null $year
     * @param int|null $month
     *
     * @return void
     */
    public function decrementMetric(mixed $key, int $value = 1, ?int $year = null, ?int $month = null): void
    {
        $key = is_enum($key) ? $key->value : $key;

        $this->metrics()->where([
            'key'   => $key,
            'year'  => $year ?? now()->year,
            'month' => $month ?? now()->month,
        ])->first()?->decrement('value', $value);
    }

    /**
     * Reset a metric back to zero.
     *
     * @param mixed    $key
     * @param int|null $year
     * @param int|null $month
     *
     * @return void
     */
    public function resetMetric(mixed $key, ?int $year = null, ?int $month = null): void
    {
        $key = is_enum($key) ? $key->value : $key;

        $this->metrics()->where([
            'key'   => $key,
            'year'  => $year ?? now()->year,
            'month' => $month ?? now()->month,
        ])->first()?->update(['value' => 0]);
    }
}
