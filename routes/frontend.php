<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;


Route::get('/',[HomeController::class,'home'])->name('home');
Route::resource('/contact-us', ContactController::class)->only('store');