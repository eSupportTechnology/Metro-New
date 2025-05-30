<?php

namespace App\Http\Controllers;

use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SocialController extends Controller
{
    public function listSocials()
    {
        $socials = Social::all();
        return response()->json($socials);
    }

    public function createSocial(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'link' => 'required|url|max:500',
        ]);

        $social = Social::create($validated);

        return response()->json($social, Response::HTTP_CREATED);
    }

    public function updateSocial(Request $request, string $id)
    {
        $social = Social::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'link' => 'sometimes|required|url|max:500',
        ]);

        $social->update($validated);

        return response()->json($social);
    }
}
