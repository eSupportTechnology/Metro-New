<?php

namespace App\Http\Controllers;

use App\Action\NIC\GetAllNic;
use Illuminate\Http\JsonResponse;

class NicController extends Controller
{
    public function getAllNic(GetAllNic $getAllNic): JsonResponse
    {
        return response()->json($getAllNic());
    }
}
