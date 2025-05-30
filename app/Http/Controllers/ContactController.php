<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ContactController extends Controller
{
    public function listContacts()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    public function updateContact(Request $request, string $id)
    {
        $contact = Contact::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'data' => 'nullable|string',
        ]);

        $contact->update($validated);

        return response()->json($contact);
    }
}
