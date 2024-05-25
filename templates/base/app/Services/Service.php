<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

readonly class Service
{
    public function __construct(
        public Model $model
    ) {}

    public function setRelation(string $relation, mixed $value): void
    {
        $this->model->{$relation}()->associate($value);
    }
}
