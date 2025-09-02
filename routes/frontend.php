<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;



Route::resource('/contact-us', ContactController::class)->only('store');