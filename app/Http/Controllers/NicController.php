<?php

namespace App\Http\Controllers;

use App\Action\NIC\GetAllNic;
use App\Action\NIC\GetNicDetail;
use App\Action\NIC\RejectNic;
use App\Action\NIC\VerifyNic;
use Illuminate\Http\JsonResponse;

class NicController extends Controller
{
    public function getAllNic(GetAllNic $getAllNic): JsonResponse
    {
        return response()->json($getAllNic());
    }

    public function verifyNic(string $nicNumber, VerifyNic $verifyNic): JsonResponse
    {
        return response()->json($verifyNic($nicNumber));
    }

    public function rejectNic(string $nicNumber, RejectNic $rejectNic): JsonResponse
    {
        return response()->json($rejectNic($nicNumber));
    }

    public function getNicDetail(string $nicNumber, GetNicDetail $getNicDetail): JsonResponse
    {
        return response()->json($getNicDetail($nicNumber));
    }
}
