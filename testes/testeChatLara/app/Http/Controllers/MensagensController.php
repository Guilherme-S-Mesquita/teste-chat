<?php

namespace App\Http\Controllers;

use App\Events\MensagemEnviar;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;

class MensagensController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function broadcast (Request $request){
        $message = Message::create([
            'user_id' => auth()->id(),
            'message' => $request->input('message'),
        ]);

        broadcast(new MensagemEnviar($message))->toOthers();

        return response()->json(['status' => 'Message Enviada!']);

    }
    public function fetchMessages()
    {
        return Message::with('user')->get();
    }
}
