
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MensagensController;

Route::post('/broadcast', [MensagensController::class, 'broadcast']);
Route::get('/messages', [MensagensController::class, 'fetchMessages']);
