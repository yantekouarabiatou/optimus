<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => array_merge($user->only('id', 'name', 'email'), [
                'roles' => $user->getRoleNames(),
            ]),
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user  = User::create([...$data, 'password' => Hash::make($data['password'])]);
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token'   => $token,
            'user'    => array_merge($user->only('id', 'name', 'email'), [
                'roles' => $user->getRoleNames(),
            ]),
        ], 201);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['success' => true, 'message' => 'Déconnecté.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['success' => true, 'user' => $request->user()]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'name'             => 'sometimes|required|string|max:255',
            'current_password' => 'required_with:password|string',
            'password'         => 'sometimes|required|string|min:8|confirmed',
        ]);

        if (isset($data['password'])) {
            if (! Hash::check($data['current_password'], $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le mot de passe actuel est incorrect.',
                ], 422);
            }
            $user->password = Hash::make($data['password']);
        }

        if (isset($data['name'])) {
            $user->name = $data['name'];
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour.',
            'user'    => array_merge($user->only('id', 'name', 'email'), [
                'roles' => $user->getRoleNames(),
            ]),
        ]);
    }
}
