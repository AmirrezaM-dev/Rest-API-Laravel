<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Timesheet;
use App\Models\User;
use Validator;
use App\Http\Resources\TimesheetResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class TimesheetController extends BaseController
{
	/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {

		$query = Timesheet::query()->where('user_id', Auth::id());

		// Apply filters based on URL parameters

		// Filter by 'task_name' field
		if ($request->filled('task_name')) {
			$query->where('task_name', 'like', '%' . $request->input('task_name') . '%');
		}

		// Filter by 'date' field
		if ($request->filled('date')) {
			$query->where('date', 'like', '%' . $request->input('date') . '%');
		}

		// Filter by 'hours' field
		if ($request->filled('hours')) {
			$query->where('hours', 'like', '%' . $request->input('hours') . '%');
		}

		// Add more filters as needed

		// Fetch timesheets based on applied filters
		$timesheets = $query->get();
    
        return $this->sendResponse(TimesheetResource::collection($timesheets), 'Timesheets retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
			'task_name' => 'required',
			'date' => 'required',
			'hours' => 'required',
			'project_id' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }

		$userId = Auth::id();
   
        $timesheet = Timesheet::create([
			"task_name" => $input["task_name"],
			"date" => $input["date"],
			"hours" => $input["hours"],
			"project_id" => $input["project_id"],
			"user_id" => $userId,
		]);
   
        return $this->sendResponse(new TimesheetResource($timesheet), 'Timesheet created successfully.');
    } 
   
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): JsonResponse
    {
        $timesheet = Timesheet::where('user_id', Auth::id())
                           ->where('id', $id)
                           ->first();
  
        if (is_null($timesheet)) {
            return $this->sendError('Timesheet not found.');
        }
   
        return $this->sendResponse(new TimesheetResource($timesheet), 'Timesheet retrieved successfully.');
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Timesheet $timesheet): JsonResponse
    {
		if (Auth::id() !== $timesheet->user_id) {
			return $this->sendError('Timesheet not found');
		}


        $input = $request->all();
   
        $validator = Validator::make($input, [
            'task_name' => 'required',
			'date' => 'required',
			'hours' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
		$timesheet->task_name = $input['task_name'];
		$timesheet->date = $input['date'];
		$timesheet->hours = $input['hours'];
        $timesheet->save();;
   
        return $this->sendResponse(new TimesheetResource($timesheet), 'Timesheet updated successfully.');
    }
   
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Timesheet $timesheet): JsonResponse
    {
		if (Auth::id() !== $timesheet->user_id) {
			return $this->sendError('Timesheet not found');
		}
        $timesheet->delete();
   
        return $this->sendResponse([], 'Timesheet deleted successfully.');
    }
}
