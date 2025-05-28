<?php

namespace App\Http\Controllers;

use App\Action\MatrimonyLog\GetAllMatrimonyLogs;
use Illuminate\Http\JsonResponse;

class MatrimonyLogController extends Controller
{
    public function getAllLogs(GetAllMatrimonyLogs $getAllMatrimonyLogs): JsonResponse
    {
        return response()->json($getAllMatrimonyLogs());
    }
}
