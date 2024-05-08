<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Project;
use App\Models\User;
use Validator;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
   
class ProjectController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
		$query = Project::query();

		// Apply filters based on URL parameters

		// Filter by 'name' field
		if ($request->filled('name')) {
			$query->where('name', 'like', '%' . $request->input('name') . '%');
		}

		// Filter by 'department' field
		if ($request->filled('department')) {
			$query->where('department', 'like', '%' . $request->input('department') . '%');
		}

		// Filter by 'start_date' field
		if ($request->filled('start_date')) {
			$query->where('start_date', 'like', '%' . $request->input('start_date') . '%');
		}

		// Filter by 'end_date' field
		if ($request->filled('end_date')) {
			$query->where('end_date', 'like', '%' . $request->input('end_date') . '%');
		}

		// Filter by 'status' field
		if ($request->filled('status')) {
			$query->where('status', 'like', '%' . $request->input('status') . '%');
		}

		// Add more filters as needed

		// Fetch projects based on applied filters
		$projects = $query->get();
    
        return $this->sendResponse(ProjectResource::collection($projects), 'Projects retrieved successfully.');
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
			'name' => 'required',
			'department' => 'required',
			'start_date' => 'required',
			'end_date' => 'required',
			'status' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $project = Project::create($input);
   
        return $this->sendResponse(new ProjectResource($project), 'Project created successfully.');
    } 
   
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id): JsonResponse
    {
        $project = Project::find($id);
  
        if (is_null($project)) {
            return $this->sendError('Project not found.');
        }
   
        return $this->sendResponse(new ProjectResource($project), 'Project retrieved successfully.');
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project): JsonResponse
    {
		if (Auth::id() !== $project->user_id) {
			return $this->sendError('Project not found');
		}
		
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'name' => 'required',
			'department' => 'required',
			'start_date' => 'required',
			'end_date' => 'required',
			'status' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
		$project->name = $input['name'];
		$project->department = $input['department'];
		$project->start_date = $input['start_date'];
		$project->end_date = $input['end_date'];
		$project->status = $input['status'];
        $project->save();;
   
        return $this->sendResponse(new ProjectResource($project), 'Project updated successfully.');
    }
   
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project): JsonResponse
    {
		if (Auth::id() !== $project->user_id) {
			return $this->sendError('Project not found');
		}
        $project->delete();
   
        return $this->sendResponse([], 'Project deleted successfully.');
    }

	public function assign($id)
	{
		// Find the project by ID
		$project = Project::find($id);

		if (is_null($project)) {
			return $this->sendError('Project not found.');
		}

		// Get the authenticated user's ID
		$userId = Auth::id();

		// Check if the user is already attached to the project
		if ($project->users()->where('user_id', $userId)->exists()) {
			return response()->json(['message' => 'User is already assigned to this project.'], 400);
		}

		// Attach the user to the project (assuming 'users' is the pivot table name)
		$project->users()->attach($userId);

		// Return a success response
		return response()->json(['message' => 'User assigned to project successfully'], 200);
	}


}