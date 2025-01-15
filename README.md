# Backend API Documentation

This is a backend API for managing employees and attendance. To get started with the application, follow the steps below.

## Prerequisites

Ensure that you have the following installed:
- Node.js (>=14.x.x)
- npm (>=6.x.x)

## Setup and Running the Application

1. Clone the repository to your local machine:
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. Install the required dependencies:
    ```bash
    npm i
    ```

3. Create a `.env` file in the root of the project and set the required environment variables, including `JWT_SECRET`:
    ```bash
    JWT_SECRET=<your_secret_key>
    ```

4. Seed the database with initial data:
    ```bash
    npm run seed
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

The API will be available at `http://localhost:3000`.

## Authentication

You can login using the following credentials:

- **Admin**:  
    - Email: `admin@gmail.com`  
    - Password: `123456`

- **Employee**:  
    - Email: `employee@gmail.com`  
    - Password: `123456`

To login, make a POST request to:

- **Route**: `POST http://localhost:3000/api/auth/login`  
    - **Request body**:  
        ```json
        {
            "email": "<email>",
            "password": "<password>"
        }
        ```

## Admin Routes

The following routes are available for admin users:

1. **Add Employee**  
    - **Route**: `POST http://localhost:3000/api/admin/addemployee`  
    - **Request body**:  
        ```json
        {
            "name": "<name>",
            "email": "<email>",
            "password": "<password>",
            "role": "<role>"
        }
        ```

2. **Get All Attendance Data**  
    - **Route**: `GET http://localhost:3000/api/admin`  
    - **Description**: Get a list of all users' attendance data.

3. **Get All Employees**  
    - **Route**: `GET http://localhost:3000/api/admin/employeelist`  
    - **Description**: Get a list of all employees.

4. **Update Employee Data**  
    - **Route**: `PUT http://localhost:3000/api/admin/{id}`  
    - **Request body**:  
        ```json
        {
            "name": "<name>",
            "email": "<email>",
            "role": "<role>"
        }
        ```

5. **Delete Employee**  
    - **Route**: `DELETE http://localhost:3000/api/admin/{id}`  
    - **Description**: Delete an employee by ID.

6. **Get Specific Employee Data**  
    - **Route**: `GET http://localhost:3000/api/admin/employee/{id}`  
    - **Description**: Get data for a specific employee by their ID.

## Notes

- Replace `{id}` with the actual ID of the user when making requests to the routes that require it.
- Ensure you are logged in with the proper credentials (admin or employee) for the respective routes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
