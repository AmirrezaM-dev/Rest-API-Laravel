<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Http\JsonResponse;
   
class UserController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
	public function index(Request $request): JsonResponse
    {

		$query = User::query();

		// Apply filters based on URL parameters
		// Filter by 'task_name' field
		if ($request->filled('first_name')) {
			$query->where('first_name', 'like', '%' . $request->input('first_name') . '%');
		}
		if ($request->filled('last_name')) {
			$query->where('last_name', 'like', '%' . $request->input('last_name') . '%');
		}
		if ($request->filled('date_of_birth')) {
			$query->where('date_of_birth', 'like', '%' . $request->input('date_of_birth') . '%');
		}
		if ($request->filled('gender')) {
			$query->where('gender', 'like', '%' . $request->input('gender') . '%');
		}
		if ($request->filled('email')) {
			$query->where('email', 'like', '%' . $request->input('email') . '%');
		}
		if ($request->filled('password')) {
			$query->where('password', 'like', '%' . $request->input('password') . '%');
		}

		// Add more filters as needed

		// Fetch users based on applied filters
		$users = $query->get();
    
        return $this->sendResponse(UserResource::collection($users), 'Timesheets retrieved successfully.');
    }

	public function store(Request $request): JsonResponse
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
			'first_name' => 'required',
			'last_name' => 'required',
			'date_of_birth' => 'required',
			'gender' => 'required',
			'email' => 'required',
			'password' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $user = User::create($input);
   
        return $this->sendResponse(new UserResource($user), 'User created successfully.');
    }

	public function show($id): JsonResponse
    {
        $user = User::find($id);
  
        if (is_null($user)) {
            return $this->sendError('User not found.');
        }
   
        return $this->sendResponse(new UserResource($user), 'User retrieved successfully.');
    }
	public function update(Request $request, User $user): JsonResponse
    {
		if (Auth::id() !== $user->user_id) {
			return $this->sendError('You are not authorized to update this user');
		}
		
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'first_name' => 'required',
			'last_name' => 'required',
			'date_of_birth' => 'required',
			'gender' => 'required',
			'email' => 'required',
			'password' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->date_of_birth = $input['date_of_birth'];
		$user->gender = $input['gender'];
		$user->email = $input['email'];
		$user->password = $input['password'];
        $user->save();;
   
        return $this->sendResponse(new UserResource($user), 'User updated successfully.');
    }
	public function destroy(User $user): JsonResponse
    {
		if (Auth::id() !== $user->user_id) {
			return $this->sendError('You are not authorized to delete this user');
		}
        $user->delete();
   
        return $this->sendResponse([], 'User deleted successfully.');
    }

    public function register(Request $request): JsonResponse
    {

		$validator = Validator::make($request->all(), [
			'first_name' => 'required|string|max:255',
			'last_name' => 'required|string|max:255',
			'date_of_birth' => 'required|date',
			'gender' => 'required|in:male,female,other',
			'email' => 'required|email|unique:users,email',
			'password' => 'required|string|min:8',
		]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['name'] =  $user->name;
   
        return $this->sendResponse($success, 'User register successfully.');
    }
   
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request): JsonResponse
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->plainTextToken; 
            $success['name'] =  $user->name;
   
            return $this->sendResponse($success, 'User login successfully.');
        } 
        else{ 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }

	public function logout(Request $request): JsonResponse
    {
        $user = Auth::user(); 
        if ($user) {
            $user->tokens()->delete(); // Revoke all tokens for the user
            return $this->sendResponse([], 'User logged out successfully.');
        } else {
            return $this->sendError('Unauthorized.', ['error' => 'Unauthenticated']);
        }
    }

}