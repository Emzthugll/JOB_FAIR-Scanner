<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('scanner_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recruitment_activity_id')
                  ->constrained('recruitment_activities')
                  ->onDelete('cascade');
            $table->string('venue')->nullable(); 
            $table->string('pin_code', 4); 
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scanner_tokens');
    }
};
