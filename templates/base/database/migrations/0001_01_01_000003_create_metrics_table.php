<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('metrics', function (Blueprint $table) {
            $table->id();

            $table->morphs('measurable');
            $table->string('key');
            $table->integer('value');
            $table->integer('year');
            $table->integer('month');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('metrics');
    }
};
