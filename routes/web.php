<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\ServiceController;







Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('/contacts', ContactController::class)->except('store');
    Route::resource('/services',ServiceController::class);
    Route::resource('/notices',NoticeController::class);
    Route::resource('/galleries',GalleryController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/frontend.php';