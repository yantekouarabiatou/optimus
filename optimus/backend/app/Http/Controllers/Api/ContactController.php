<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $contacts = Contact::when(
                $request->has('unread'),
                fn ($q) => $q->where('is_read', false)
            )
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $contacts]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        $contact = Contact::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
            'data'    => $contact,
        ], 201);
    }

    public function markAsRead(Contact $contact): JsonResponse
    {
        $contact->update(['is_read' => true, 'read_at' => now()]);

        return response()->json(['success' => true, 'data' => $contact]);
    }

    public function destroy(Contact $contact): JsonResponse
    {
        $contact->delete();

        return response()->json(['success' => true, 'message' => 'Message supprimé.']);
    }
}
