<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\TimesheetController;
use App\Http\Controllers\API\BaseController as BaseController;


Route::controller(UserController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});
        
Route::middleware('auth:sanctum')->group( function () {

	Route::resource('users', UserController::class);
	Route::post('users/{timesheet}/update', [UserController::class, 'update']);
	Route::post('users/{timesheet}/delete', [UserController::class, 'destroy']);

	Route::resource('timesheets', TimesheetController::class);
	Route::post('timesheets/{timesheet}/update', [TimesheetController::class, 'update']);
	Route::post('timesheets/{timesheet}/delete', [TimesheetController::class, 'destroy']);
	
    Route::resource('projects', ProjectController::class);
	Route::get('projects/assign/{id}', [ProjectController::class, 'assign']);
	Route::post('projects/{timesheet}/update', [ProjectController::class, 'update']);
	Route::post('projects/{timesheet}/delete', [ProjectController::class, 'destroy']);
	
	Route::any('logout', [UserController::class, 'logout']);
});