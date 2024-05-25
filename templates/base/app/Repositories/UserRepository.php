<?php

namespace App\Repositories;

use App\Models\User;

readonly class UserRepository extends Repository
{
    public function __construct(
        public User $user
    ) {}
}
