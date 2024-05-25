<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

readonly class Repository
{
    public function transact(callable $callback): bool
    {
        DB::beginTransaction();

        try {
            $result = $callback($this);
            DB::commit();

            return $result;
        } catch (\Exception $exception) {
            Log::error($exception);
            DB::rollBack();

            return false;
        }
    }
}
