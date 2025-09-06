<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services=Service::get();
        return Inertia::render('server-side/service/index',['allservices'=>$services]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return Inertia::render('server-side/service/service-form');
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(StoreServiceRequest $request)
{
    $validated = $request->validated();

    if ($request->hasFile('service_image')) {
        // store the uploaded file
        $file = $request->file('service_image')->store('services_images', 'public');
        // convert to public URL
        $validated['service_image'] = Storage::url($file);
    }

    Service::create($validated);

    return redirect()->route('services.index')->with('success', 'Service Created Successfully!');
}


    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        // dd("Hello");
        return Inertia::render('server-side/service/service-form',['service'=>$service,'isShow'=>true]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        return Inertia::render('server-side/service/service-form',['service'=>$service,'isEdit'=>true]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $validated = $request->all();
        
        // dd($validated);
        if ($request->hasFile('service_image')) {
        // Delete old image if exists
        if ($service->service_image) {
        $oldPath = str_replace('/storage/', '', $service->service_image);
        Storage::disk('public')->delete($oldPath);
        }

        // Store new image
        $file = $request->file('service_image')->store('services_images', 'public');
        $validated['service_image'] = Storage::url($file);
        } else {
        // keep old image if not updating
        $validated['service_image'] = $service->service_image;
        }

        $service->update($validated);

        return redirect()->route('services.index')->with('success', 'Service Updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        // dd($service);
        if($service->service_image){
           $filePath = str_replace('/storage/', '', $service->service_image);
           Storage::disk('public')->delete($filePath);
        }
        $service->delete();
        return redirect()->route('services.index')->with('success','Service Deleted Successfully');
    }
}