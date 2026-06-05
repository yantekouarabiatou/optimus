<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\View\View;

class ContactController extends Controller
{
    public function index(): View
    {
        $contacts = Contact::orderBy('is_read')->orderBy('created_at', 'desc')->get();
        return view('admin.contacts.index', compact('contacts'));
    }

    public function show(Contact $contact): View
    {
        if (!$contact->is_read) {
            $contact->update(['is_read' => true, 'read_at' => now()]);
        }

        $prev = Contact::where('created_at', '<', $contact->created_at)->orderBy('created_at', 'desc')->first();
        $next = Contact::where('created_at', '>', $contact->created_at)->orderBy('created_at', 'asc')->first();

        return view('admin.contacts.show', compact('contact', 'prev', 'next'));
    }

    public function markAsRead(Contact $contact)
    {
        $contact->update(['is_read' => true, 'read_at' => now()]);
        return back()->with('success', 'Message marqué comme lu.');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return redirect()->route('admin.contacts.index')->with('success', 'Message supprimé.');
    }
}
