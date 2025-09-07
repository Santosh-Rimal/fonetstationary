<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Notice;
use App\Models\Gallery;
use App\Models\Service;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function home()
    {
        $services=Service::get();
        $notices=Notice::get();
        $galleries=Gallery::get();
         return Inertia::render('client-side/home',['services'=>$services,'notices'=>$notices,'galleries'=>$galleries]);
    }
}