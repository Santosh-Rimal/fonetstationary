<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreGalleryRequest;
use App\Http\Requests\UpdateGalleryRequest;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galleries=Gallery::get();
        return Inertia::render('server-side/gallery/index',['galleries'=>$galleries]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('server-side/gallery/gallery-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGalleryRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('gallery_image')) {
            $imagePath = $request->file('gallery_image')->store('gallery_images', 'public');
            $validated['gallery_image'] = Storage::url($imagePath);    
        }

        Gallery::create($validated);

        return redirect()->route('galleries.index')->with('success', 'Gallery image uploaded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        return Inertia::render('server-side/gallery/gallery-form',['gallery'=>$gallery,'isShow'=>true]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        return Inertia::render('server-side/gallery/gallery-form',['gallery'=>$gallery,'isEdit'=>true]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGalleryRequest $request, Gallery $gallery)
    {
        $validated = $request->validated();

        if ($request->hasFile('gallery_image')) {
            if ($gallery->gallery_image) {
            $oldImagePath = str_replace('/storage/', '', $gallery->gallery_image);
            Storage::disk('public')->delete($oldImagePath);
            }
            $imagePath = $request->file('gallery_image')->store('gallery_images', 'public');
            $validated['gallery_image'] = Storage::url($imagePath);
        }else{
            $validated['gallery_image'] = $gallery->gallery_image;
        }

        $gallery->update($validated);

        return redirect()->route('galleries.index')->with('success', 'Gallery image updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        if($gallery->gallery_image){
            $oldImagePath = str_replace('/storage/', '', $gallery->gallery_image);
            Storage::disk('public')->delete($oldImagePath);
        }
        $gallery->delete();
        return redirect()->route('galleries.index')->with('success', 'Gallery image deleted successfully.');
    }
}