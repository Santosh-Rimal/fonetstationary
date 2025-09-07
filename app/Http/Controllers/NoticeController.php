<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Notice;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreNoticeRequest;
use App\Http\Requests\UpdateNoticeRequest;

class NoticeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notices=Notice::get();
        return Inertia::render('server-side/notice/index',['notices'=>$notices]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('server-side/notice/notice-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNoticeRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('notice_image')) {
            $imagePath = $request->file('notice_image')->store('notices', 'public');
            $data['notice_image'] = Storage::url($imagePath);
        }

        Notice::create($data);

        return to_route('notices.index')->with('success', 'Notice created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Notice $notice)
    {
        return Inertia::render('server-side/notice/notice-form',['notice'=>$notice,'isShow'=>true]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notice $notice)
    {
        return Inertia::render('server-side/notice/notice-form',['notice'=>$notice,'isEdit'=>true]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNoticeRequest $request, Notice $notice)
    {
        $data = $request->validated();
        if ($request->hasFile('notice_image')) {
            // Delete the old image if it exists
            if ($notice->notice_image) {
                $oldImagePath = str_replace('/storage/', '', $notice->notice_image);
                Storage::disk('public')->delete($oldImagePath);
            }

            $imagePath = $request->file('notice_image')->store('notices', 'public');
            $data['notice_image'] = Storage::url($imagePath);
        }else{
            // If no new image is uploaded, retain the old image path
            $data['notice_image'] = $notice->notice_image;
        }
// dd($data);
        $notice->update($data);

        return to_route('notices.index')->with('success', 'Notice updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notice $notice)
    {
        if($notice->notice_image){
            $imagePath = str_replace('/storage/', '', $notice->notice_image);
            Storage::disk('public')->delete($imagePath);
        }
        $notice->delete();
        return to_route('notices.index')->with('success', 'Notice deleted successfully.');
    }
}