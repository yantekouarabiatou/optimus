<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::with('roles')->orderBy('name')->get()->map(fn ($u) => [
            'id'         => $u->id,
            'name'       => $u->name,
            'email'      => $u->email,
            'roles'      => $u->getRoleNames(),
            'created_at' => $u->created_at,
        ]);

        return response()->json(['success' => true, 'data' => $users]);
    }

    public function updateRoles(Request $request, User $user): JsonResponse
    {
        $request->validate(['roles' => 'required|array']);
        $user->syncRoles($request->roles);

        return response()->json(['success' => true, 'data' => [
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames(),
        ]]);
    }

    public function destroy(User $user): JsonResponse
    {
        abort_if($user->id === auth()->id(), 403, 'Impossible de supprimer votre propre compte.');
        $user->delete();

        return response()->json(['success' => true, 'message' => 'Utilisateur supprimé.']);
    }
}
