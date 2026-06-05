<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'icon', 'image', 'active'];

    protected static function booted(): void
    {
        static::creating(fn ($cat) => $cat->slug ??= Str::slug($cat->name));
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function getProductsCountAttribute(): int
    {
        return $this->products()->where('active', true)->count();
    }
}
