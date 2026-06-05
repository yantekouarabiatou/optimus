<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\View\View;

class ProfileController extends Controller
{
    public function index(): View
    {
        return view('admin.profile');
    }

    public function update(Request $request)
    {
        $user    = auth()->user();
        $section = $request->input('section');

        if ($section === 'name') {
            $request->validate(['name' => 'required|string|max:255']);
            $user->update(['name' => $request->name]);
            return back()->with('success', 'Nom mis à jour.');
        }

        if ($section === 'password') {
            $request->validate([
                'current_password' => 'required|string',
                'password'         => 'required|string|min:8|confirmed',
            ]);

            if (!Hash::check($request->current_password, $user->password)) {
                return back()->withErrors(['current_password' => 'Le mot de passe actuel est incorrect.']);
            }

            $user->update(['password' => Hash::make($request->password)]);
            return back()->with('success', 'Mot de passe modifié.');
        }

        return back();
    }
}
