# Task Manager API

A RESTful Task Management backend built using **Node.js, Express.js, MongoDB Atlas, and Mongoose**.

The API provides secure user authentication, JWT-based authorization, task CRUD operations, filtering, sorting, pagination, input validation, role-based admin access, Swagger API documentation, rate limiting, and automated API testing.

---

## 🚀 Features

- User registration
- User login
- JWT-based authentication
- Protected routes
- Role-based admin authorization
- User profile
- Create tasks
- Get tasks
- Get task by ID
- Update tasks
- Delete tasks
- Task ownership protection
- Task status filtering
- Task priority filtering
- Task sorting
- Task pagination
- Request validation
- MongoDB ObjectId validation
- Centralized error handling
- Helmet security headers
- CORS configuration
- API rate limiting
- Authentication rate limiting
- Swagger/OpenAPI documentation
- Jest automated testing
- Supertest API testing
- Separate MongoDB test database
- API versioning using `/api/v1`

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Authentication

- JSON Web Token (JWT)
- bcrypt

## Security

- Helmet
- CORS
- express-rate-limit

## Validation

- Express validation middleware
- Mongoose validation
- MongoDB ObjectId validation

## Testing

- Jest
- Supertest

## API Documentation

- Swagger
- OpenAPI

---

# 📁 Project Structure

```text
Task Manager/
│
├── config/
│   ├── db.js
│   └── swagger.js
│
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── adminController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   ├── errorMiddleware.js
│   ├── rateLimitMiddleware.js
│   ├── validateObjectId.js
│   └── validationMiddleware.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── index.js
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   ├── userRoutes.js
│   └── adminRoutes.js
│
├── validators/
│   ├── authValidator.js
│   └── taskValidator.js
│
├── tests/
│   ├── app.test.js
│   ├── auth.test.js
│   └── task.test.js
│
├── .env
├── .env.example
├── .gitignore
├── README.md
├── app.js
├── server.js
├── package.json
└── package-lock.json

🏗️ Architecture

The API follows a layered backend architecture:

Client
   │
   ▼
Express Application
   │
   ▼
Security Middleware
   │
   ├── Helmet
   ├── CORS
   └── Rate Limiting
   │
   ▼
API Versioning
   │
   ▼
Routes
   │
   ▼
Authentication / Authorization
   │
   ▼
Validation Middleware
   │
   ▼
Controllers
   │
   ▼
Mongoose Models
   │
   ▼
MongoDB Atlas
⚙️ Prerequisites

Before running the project, make sure you have:

Node.js installed
npm installed
MongoDB Atlas account
MongoDB Atlas cluster
MongoDB database user
Postman or another API client (optional)

Check Node.js:

node --version

Check npm:

npm --version
📥 Installation
1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
2. Navigate to the project
cd Task-Manager
3. Install dependencies
npm install
🔐 Environment Variables

Create a .env file in the project root.

PORT=5000


MONGO_URI=your_mongodb_atlas_connection_string


MONGO_TEST_URI=your_test_mongodb_atlas_connection_string


JWT_SECRET=your_jwt_secret


CLIENT_URL=http://localhost:3000
MongoDB Database Separation

The application uses two separate MongoDB databases.

Development database
MONGO_URI
    ↓
taskmanager
Test database
MONGO_TEST_URI
    ↓
taskmanager_test

This separation prevents automated tests from modifying real development data.

Never use the development database as the test database.

🔒 Environment Security

Never commit .env to GitHub.

The .gitignore file should contain:

node_modules/
.env
coverage/

An .env.example file can be committed:

PORT=5000


MONGO_URI=


MONGO_TEST_URI=


JWT_SECRET=


CLIENT_URL=http://localhost:3000
▶️ Running the Application
Development Mode
npm run dev

The server runs on:

http://localhost:5000
Production Mode
npm start
🏥 Health Check

The API provides a basic health endpoint.

Request
GET /
URL
http://localhost:5000/
Response
{
    "success": true,
    "message": "Task Manager API is running."
}
🔑 Authentication

The API uses JWT-based authentication.

After successful login, an access token is returned.

Protected endpoints require the token in the request header:

Authorization: Bearer <ACCESS_TOKEN>
👤 Authentication API

All authentication endpoints are under:

/api/v1/auth
Register User
Endpoint
POST /api/v1/auth/register
Request Body
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
}
Example Response
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "id": "USER_ID",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
🔐 Login User
Endpoint
POST /api/v1/auth/login
Request Body
{
    "email": "john@example.com",
    "password": "123456"
}

The login endpoint returns an authentication token.

Example:

{
    "success": true,
    "message": "Login successful",
    "token": "JWT_ACCESS_TOKEN"
}

Use this token for protected endpoints.

👤 User API
Get User Profile
Endpoint
GET /api/v1/users/profile
Authentication

Required.

Authorization: Bearer <ACCESS_TOKEN>
📝 Task API

All task endpoints are under:

/api/v1/tasks

All task endpoints require authentication.

Create Task
Endpoint
POST /api/v1/tasks
Headers
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
Request Body
{
    "title": "Learn Node.js",
    "description": "Complete the backend project",
    "status": "Pending",
    "priority": "High"
}
Supported Status Values
Pending
In Progress
Completed
Supported Priority Values
Low
Medium
High
📋 Get Tasks
Endpoint
GET /api/v1/tasks
Headers
Authorization: Bearer <ACCESS_TOKEN>

Returns tasks belonging to the authenticated user.

🔎 Filter Tasks by Status
Example
GET /api/v1/tasks?status=Completed

Supported values:

Pending
In Progress
Completed

Example:

/api/v1/tasks?status=Pending
🎯 Filter Tasks by Priority
Example
GET /api/v1/tasks?priority=High

Supported values:

Low
Medium
High

Example:

/api/v1/tasks?priority=Low
🔢 Pagination

Tasks can be retrieved using pagination parameters.

Example:

GET /api/v1/tasks?page=1&limit=10

Where:

page
    → Page number


limit
    → Number of tasks per page
↕️ Sorting

Tasks support sorting using the supported sort parameter.

Example:

GET /api/v1/tasks?sort=createdAt

Sorting can be combined with filtering and pagination.

Example:

GET /api/v1/tasks?status=Completed&priority=High&page=1&limit=10&sort=createdAt

Use only the sort values supported by the task query validator in the current implementation.

🔍 Get Task by ID
Endpoint
GET /api/v1/tasks/:id

Example:

GET /api/v1/tasks/64abc123456789

Authentication is required.

Invalid MongoDB ObjectIds are rejected before querying the database.

✏️ Update Task
Endpoint
PUT /api/v1/tasks/:id
Headers
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
Example Request
{
    "title": "Updated Task",
    "description": "Updated description",
    "status": "Completed",
    "priority": "Medium"
}

Only the authenticated user's own task can be updated.

🗑️ Delete Task
Endpoint
DELETE /api/v1/tasks/:id
Headers
Authorization: Bearer <ACCESS_TOKEN>

Only the authenticated user's own task can be deleted.

👑 Admin API

Administrative endpoints require:

Valid JWT
Admin role
Get All Users
Endpoint
GET /api/v1/admin/users
Headers
Authorization: Bearer <ADMIN_ACCESS_TOKEN>

The endpoint returns the users available in the database according to the current admin controller implementation.

🛡️ Security

The API implements multiple security mechanisms.

JWT Authentication

Protected endpoints require a valid JWT.

Invalid or missing tokens result in an authentication error.

Role-Based Authorization

Administrative endpoints require the user to have the appropriate admin role.

Helmet

Helmet is used to add security-related HTTP headers.

app.use(helmet());
CORS

CORS is enabled to control cross-origin requests.

The configuration can be restricted to a specific frontend origin in production.

Rate Limiting

The API uses express-rate-limit.

General API requests are rate limited.

Authentication endpoints have a stricter rate limit to reduce brute-force attempts.

✅ Validation

The application validates incoming requests before they reach the controllers.

Validation includes:

Required fields
Email validation
Password validation
Task title validation
Task status validation
Task priority validation
Query parameter validation
Sorting validation
MongoDB ObjectId validation

Invalid requests return appropriate HTTP error responses.

❌ Error Handling

The application uses centralized error handling through:

middleware/errorMiddleware.js

Errors are returned in a consistent JSON format.

Example:

{
    "success": false,
    "message": "Task Not Found"
}
📚 Swagger API Documentation

Interactive API documentation is available through Swagger.

Start the application:

npm run dev

Then open:

http://localhost:5000/api-docs

Swagger provides an interactive interface for exploring and testing the API.

🧪 Automated Testing

The project uses:

Jest
Supertest

Run all tests:

npm test
Test Coverage

The automated test suite currently verifies:

Application
Health check endpoint
Authentication
Request without token
Invalid token
Tasks
Create task
Get user's tasks
Filter tasks by status
Reject invalid status
Update task
Delete task
Prevent access to another user's task
Test Database

Automated tests use a separate MongoDB database:

MONGO_TEST_URI
       ↓
taskmanager_test

The development database is:

MONGO_URI
       ↓
taskmanager

This prevents tests from intentionally modifying real application data.

🧪 Running Tests

Run all tests:

npm test

Expected output:

Test Suites: 3 passed, 3 total
Tests:       10 passed, 10 total

The exact test count may change as additional tests are added.

📡 API Request Flow

A typical protected request follows this flow:

Client
   │
   ▼
Express Application
   │
   ▼
Helmet / CORS / Rate Limiting
   │
   ▼
API Version (/api/v1)
   │
   ▼
Route
   │
   ▼
Authentication
   │
   ▼
Authorization
   │
   ▼
Validation
   │
   ▼
Controller
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB Atlas
   │
   ▼
JSON Response
🗄️ Database Models

The application currently contains two primary models.

User

The User model contains user authentication and account information.

Typical fields include:

name
email
password
role

Passwords are stored securely using password hashing.

Task

The Task model contains task information.

Typical fields include:

title
description
status
priority
createdBy

The createdBy field associates a task with its owner.

This allows the application to ensure that users can only access and modify their own tasks.

🔄 API Versioning

The API uses versioning:

/api/v1

Example:

/api/v1/tasks

Versioning makes it possible to introduce future breaking changes without immediately breaking existing clients.

Future versions can be introduced as:

/api/v2

while keeping /api/v1 available for existing clients.

📦 NPM Scripts

The project provides the following scripts:

npm start

Starts the application.

npm run dev

Starts the application in development mode using Nodemon.

npm test

Runs the Jest test suite.

🔧 Development Workflow

A typical development workflow is:

1. Start MongoDB Atlas
        ↓
2. Configure .env
        ↓
3. npm install
        ↓
4. npm run dev
        ↓
5. Test APIs using Postman / Swagger
        ↓
6. npm test
        ↓
7. Commit changes
🚨 Important Security Notes

Never commit:

.env

to GitHub.

Never expose:

MONGO_URI
MONGO_TEST_URI
JWT_SECRET

publicly.

If a database credential is accidentally exposed, rotate the credential immediately in MongoDB Atlas.

🚀 Future Improvements

Possible future enhancements include:

Refresh token implementation
Password reset
Email verification
Forgot password functionality
Advanced task search
Task due-date reminders
Task categories
Task labels/tags
Docker support
CI/CD pipeline
Automated deployment
Application logging
Monitoring
Redis caching
Production deployment
API performance optimization


## 🌐 Live API

The API is deployed on Render.

Base URL:

https://task-manager-api-z2ho.onrender.com

Swagger Documentation:

https://task-manager-api-z2ho.onrender.com/api-docs

The deployed API uses:

- Render for backend hosting
- MongoDB Atlas for cloud database
- JWT for authentication

👨‍💻 Author

Tapan Patidar

Computer Science & Engineering

📄 License

This project is currently intended for educational and portfolio purposes.





