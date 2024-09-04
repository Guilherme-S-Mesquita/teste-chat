<?php


use App\Http\Controllers\MensagensController;

Route::post('/broadcast', [MensagensController::class, 'broadcast']);
Route::get('/messages', [MensagensController::class, 'fetchMessages']);
