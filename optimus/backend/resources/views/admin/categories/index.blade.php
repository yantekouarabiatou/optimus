@extends('layouts.admin')
@section('title', 'Catégories')
@section('breadcrumb', 'Catégories')

@section('content')
<div class="space-y-6" x-data="{
  showForm: {{ $errors->any() || session('edit') ? 'true' : 'false' }},
  editId: {{ session('edit') ?? 'null' }},
  name: '{{ old('name', session('editData.name', '')) }}',
  icon: '{{ old('icon', session('editData.icon', '')) }}',
  preview: '{{ old('image', session('editData.image', '')) }}'
}">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-foreground">Catégories</h1>
    <button @click="showForm=!showForm; if(!showForm){editId=null;name='';icon='';preview=''}"
            class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-xl hover:bg-primary/90 transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      Nouvelle catégorie
    </button>
  </div>

  {{-- Form --}}
  <div x-show="showForm" x-cloak class="bg-white rounded-2xl border border-border p-6 shadow-sm">
    <h2 class="font-semibold text-foreground mb-4" x-text="editId ? 'Modifier la catégorie' : 'Nouvelle catégorie'"></h2>
    @if($errors->any())
      <div class="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
        @foreach($errors->all() as $e)<p>{{ $e }}</p>@endforeach
      </div>
    @endif
    <form method="POST" :action="editId ? '/admin/categories/'+editId : '{{ route('admin.categories.store') }}'" enctype="multipart/form-data">
      @csrf
      <input type="hidden" name="_method" :value="editId ? 'PUT' : 'POST'">
      <div class="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5">Nom *</label>
          <input name="name" x-model="name" type="text" required
                 class="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5">Icône (nom Lucide)</label>
          <input name="icon" x-model="icon" type="text" placeholder="Monitor, Cpu, Wifi…"
                 class="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-foreground mb-1.5">Image</label>
        <input type="file" name="image" accept="image/*" @change="preview=URL.createObjectURL($event.target.files[0])"
               class="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:font-medium hover:file:bg-primary/90 file:transition-colors">
        <div x-show="preview" class="mt-2 h-20 w-32 rounded-xl overflow-hidden border border-border">
          <img :src="preview" alt="" class="w-full h-full object-cover">
        </div>
      </div>
      <div class="flex gap-3">
        <button type="submit" class="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
          Enregistrer
        </button>
        <button type="button" @click="showForm=false;editId=null;name='';icon='';preview=''"
                class="px-6 py-2.5 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
          Annuler
        </button>
      </div>
    </form>
  </div>

  {{-- List --}}
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    @foreach($categories as $cat)
      <div class="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        @if($cat->image)
          <img src="{{ $cat->image }}" alt="{{ $cat->name }}" class="w-full h-32 object-cover">
        @else
          <div class="w-full h-32 bg-gradient-to-br from-primary/40 to-primary/20"></div>
        @endif
        <div class="p-4 flex items-center justify-between">
          <div>
            <p class="font-semibold text-foreground">{{ $cat->name }}</p>
            @if($cat->icon)<p class="text-xs text-muted-foreground mt-0.5">{{ $cat->icon }}</p>@endif
          </div>
          <div class="flex gap-1">
            <button @click="showForm=true;editId={{ $cat->id }};name='{{ $cat->name }}';icon='{{ $cat->icon }}';preview='{{ $cat->image }}'"
                    class="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <form method="POST" action="{{ route('admin.categories.destroy', $cat) }}" onsubmit="return confirm('Supprimer cette catégorie ?')">
              @csrf @method('DELETE')
              <button type="submit" class="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    @endforeach
  </div>
</div>
@endsection
