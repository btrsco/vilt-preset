<?php

namespace App\Traits;

use Illuminate\Contracts\Container\BindingResolutionException;

trait HasService
{
    /**
     * Service instance.
     *
     * @var mixed
     */
    protected mixed $service;

    /**
     * Boot the trait.
     *
     * @return void
     */
    protected static function bootHasService(): void
    {
        static::created(function ($model) {
            $model->initializeService();
        });

        static::retrieved(function ($model) {
            $model->initializeService();
        });
    }

    /**
     * Get the service instance for the model.
     *
     * @return mixed
     * @throws BindingResolutionException
     */
    public function service(): mixed
    {
        if ( ! $this->service) {
            $this->initializeService();
        }

        return $this->service;
    }

    /**
     * Initialize service instance.
     *
     * @return void
     * @throws BindingResolutionException
     */
    protected function initializeService(): void
    {
        $modelClass   = get_class($this);
        $serviceClass = str_replace('Models\\', 'Services\\', $modelClass) . 'Service';

        // Check if the service class exists
        if ( ! class_exists($serviceClass)) {
            throw new BindingResolutionException("Service class {$serviceClass} does not exist.");
        }

        $this->service = new $serviceClass($this);
    }
}
