## Installing and Testing the Laravel API

To install and test the Laravel API, follow these steps:

1. **Download and Extract the Laravel Files**

    - Download the Laravel project files and extract them to your desired directory.

2. **Install Composer Dependencies**

    - Navigate to the downloaded Laravel project directory.
    - Run the following command to install Composer dependencies:
        ```
        composer install
        ```

3. **Configure the `.env` File**

    - Rename the `.env.example` file to `.env`.
    - Open the `.env` file and configure the database connection settings to match your database credentials.

4. **Run Database Migrations**
    - Once the `.env` file is configured, run the following command to migrate the database tables:
        ```
        php artisan migrate
        ```
        Alternatively, you can import the `laravel.sql` file directly into your database if preferred.

After completing these steps, the Laravel API should be installed and ready for testing. Make sure to start your Laravel development server (`php artisan serve`) to interact with the API endpoints.

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

-   **Get all data**: Send a GET request to `http://localhost:8000/api/{model_name}` (Replace `{model_name}` with `users`, `projects`, or `timesheets`).
-   **Search in models**: Append query parameters to the URL to filter results, e.g., `http://localhost:8000/api/users?first_name=John`

-   **View specific record**: Send a GET request to `http://localhost:8000/api/{model_name}/{id}`, e.g., `http://localhost:8000/api/users/1`

-   **Create records**: Send a POST request to `http://localhost:8000/api/{model_name}`

-   **Update records**: Send a POST request to `http://localhost:8000/api/{model_name}/{id}/update`

-   **Delete records**: Send a POST request to `http://localhost:8000/api/{model_name}/{id}/delete`

#### Model Fields

| Model      | Fields                                                        |
| ---------- | ------------------------------------------------------------- |
| Users      | first_name, last_name, date_of_birth, gender, email, password |
| Projects   | name, department, start_date, end_date, status                |
| Timesheets | task_name, date, hours, project_id, user_id                   |

-   **Date format**: Use YYYY-MM-DD.
-   **Hours**: Should be Unix timestamp (seconds).

## Assigning a Project to a User

To assign a project to a user, send a `GET` request to `http://localhost:8000/api/projects/assign/{id}` where `{id}` is the ID of the project you want to assign.

This request will assign the authenticated user to the specified project.

Example:

```
GET http://localhost:8000/api/projects/assign/123
```

Replace `123` with the ID of the project you wish to assign to the authenticated user.

**Note:** Ensure that the user is authenticated before making any request.

Feel free to use these endpoints to interact with the API efficiently.
