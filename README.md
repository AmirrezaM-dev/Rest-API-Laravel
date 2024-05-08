### 1. React
[React Demo](https://assessment-gh6j.onrender.com)
### 2. Laravel
Coming soon

### API Usage Guide

#### Registration
To register, send a POST request to `http://localhost:8000/api/register` with the following data:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "0000-00-00",
  "gender": "male",
  "email": "info@example.com",
  "password": "secretpassword"
}
```

#### Login
To login, send a POST request to `http://localhost:8000/api/login` with the following data:
```json
{
  "email": "info@example.com",
  "password": "secretpassword"
}
```

#### Logout
To logout, send a GET request to `http://localhost:8000/api/logout` (Only works if you are logged in).

#### Authentication
After login or registration, you will receive a token. Use this token by including it in the `Authorization` header as follows:
```
Authorization: Bearer your_token
```
Example:
Your token is: `6|tRHZkuxgXvTBgeNV3E6mIiZxJOYEo89qGz71T7QR6097cad2`
Include it as: `Bearer 6|tRHZkuxgXvTBgeNV3E6mIiZxJOYEo89qGz71T7QR6097cad2`

#### Models
Available models: `users`, `projects`, `timesheets`

- **Get all data**: Send a GET request to `http://localhost:8000/api/{model_name}` (Replace `{model_name}` with `users`, `projects`, or `timesheets`).
  
- **Search in models**: Append query parameters to the URL to filter results, e.g., `http://localhost:8000/api/users?first_name=John`

- **View specific record**: Send a GET request to `http://localhost:8000/api/{model_name}/{id}`, e.g., `http://localhost:8000/api/users/1`

- **Create records**: Send a POST request to `http://localhost:8000/api/{model_name}`

- **Update records**: Send a POST request to `http://localhost:8000/api/{model_name}/{id}/update`

- **Delete records**: Send a POST request to `http://localhost:8000/api/{model_name}/{id}/delete`

#### Model Fields

| Model      | Fields           |
|------------|------------------|
| Users      | first_name, last_name, date_of_birth, gender, email, password |
| Projects   | name, department, start_date, end_date, status |
| Timesheets | task_name, date, hours, project_id, user_id |

- **Date format**: Use YYYY-MM-DD.
- **Hours**: Should be Unix timestamp (seconds).

Feel free to use these endpoints to interact with the API efficiently.

