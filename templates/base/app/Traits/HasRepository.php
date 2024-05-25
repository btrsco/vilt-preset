<?php

namespace App\Traits;

use Illuminate\Contracts\Container\BindingResolutionException;

trait HasRepository
{
    /**
     * Repository instance.
     *
     * @var mixed
     */
    protected mixed $repository;

    /**
     * Boot the trait.
     *
     * @return void
     */
    protected static function bootHasRepository(): void
    {
        static::created(function ($model) {
            $model->initializeRepository();
        });

        static::retrieved(function ($model) {
            $model->initializeRepository();
        });
    }

    /**
     * Get the repository instance for the model.
     *
     * @return mixed
     * @throws BindingResolutionException
     */
    public function repository(): mixed
    {
        if ( ! $this->repository) {
            $this->initializeRepository();
        }

        return $this->repository;
    }

    /**
     * Initialize repository instance.
     *
     * @return void
     * @throws BindingResolutionException
     */
    protected function initializeRepository(): void
    {
        $modelClass      = get_class($this);
        $repositoryClass = str_replace('Models\\', 'Repositories\\', $modelClass) . 'Repository';

        // Check if the repository class exists
        if ( ! class_exists($repositoryClass)) {
            throw new BindingResolutionException("Repository class {$repositoryClass} does not exist.");
        }

        $this->repository = new $repositoryClass($this);
    }
}
