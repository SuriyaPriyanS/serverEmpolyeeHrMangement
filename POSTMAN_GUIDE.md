# NexusHR API - Postman Collection Guide

## Overview

This directory contains comprehensive Postman collections and environments for testing and developing the NexusHR Modern Employee Management Platform API.

## Files Included

### 1. **NexusHR_API_Collection.postman_collection.json**
The main Postman collection containing all API endpoints organized into logical groups:
- Authentication (Register, Login, Logout, Profile)
- Employees (CRUD operations)
- Attendance (Clock In/Out, Records)
- Leave Requests (Apply, View, Approve)
- Projects (Create, Update, Delete, View)
- Payroll (Create, View records)
- Performance (Reviews, Ratings)
- Recruitment (Job postings, Applications)
- Onboarding (Plans, Tasks)
- Learning (Courses, Training)
- Documents (Upload, Manage)
- Expenses (Track, Submit)
- Kudos (Recognition, Rewards)
- Standups (Daily updates)
- Wellness (Coaching, Events, Mental Health)
- AI & Analytics (Dashboard, Insights)

### 2. **NexusHR_Dev_Environment.postman_environment.json**
Development environment configuration with:
- Local server URL (`http://localhost:5000`)
- Default variable placeholders for tokens and IDs

### 3. **NexusHR_Production_Environment.postman_environment.json**
Production environment configuration with:
- Production server URL (`https://api.nexushr.com`)
- Variable placeholders for production tokens and IDs

## Setup Instructions

### Step 1: Import the Collection
1. Open Postman
2. Click **Import** in the top left
3. Select the file: `NexusHR_API_Collection.postman_collection.json`
4. Click **Import**

### Step 2: Import an Environment
1. Click the **Environments** icon on the left sidebar
2. Click **Import**
3. Choose either:
   - `NexusHR_Dev_Environment.postman_environment.json` (for local testing)
   - `NexusHR_Production_Environment.postman_environment.json` (for production)
4. Click **Import**

### Step 3: Select Active Environment
1. In the top-right of Postman, select the environment from the dropdown
2. You'll see the variables populate based on your selection

## Using the Collection

### Authentication Flow

1. **Register a User** - Use the "Register User" endpoint to create a new account
   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com",
     "password": "Password123!",
     "phone": "+1234567890",
     "department": "Engineering",
     "role": "Employee"
   }
   ```

2. **Login** - Use the "Login User" endpoint with email and password
   ```json
   {
     "email": "john@example.com",
     "password": "Password123!"
   }
   ```

3. **Copy Token** - The response will include an authentication token
   - Copy the `token` from the response
   - Paste it in your environment variables as `authToken`
   - All protected endpoints will now use this token

### Making API Requests

#### Protected Endpoints
Most endpoints require authentication. Once you've set the `authToken` variable:
- The `Authorization: Bearer {{authToken}}` header is automatically included
- You can make requests to protected endpoints

#### Example: Create an Employee
1. Navigate to **Employees > Create Employee**
2. Update the request body with employee details
3. Click **Send**
4. Check the response for success

#### Example: Request Leave
1. Navigate to **Leave Requests > Request Leave**
2. Fill in leave details (dates, type, reason)
3. Click **Send**
4. The response will contain the leave request ID

## Variables

The following variables can be set in your environment:

| Variable | Description | Example |
|----------|-------------|---------|
| `baseUrl` | API server URL | `http://localhost:5000` |
| `authToken` | Bearer token from login | (set after login) |
| `userId` | Current user ID | (obtained after login) |
| `employeeId` | Employee ID for operations | `emp123` |
| `projectId` | Project ID for operations | `proj456` |
| `leaveRequestId` | Leave request ID | `leave789` |

## Common Workflows

### Creating a Complete Employee Record

1. **Register** the user (if not already registered)
2. **Login** with the credentials
3. **Create Employee** profile with additional details
4. **Create Onboarding Plan** for the new employee
5. **Create Payroll** record

### Requesting and Approving Leave

1. **Request Leave** - Employee submits leave request
2. **Update Leave Status** - Manager/HR approves the request

### Project Management

1. **Create Project** - Manager creates a new project
2. **Update Project** - Modify project details and track progress
3. **Delete Project** - Remove closed projects

### Performance Management

1. **Create Performance Review** - Submit review for employee
2. **Get Performance Reviews** - View all reviews

### Wellness Features

1. **Create Wellness Log** - Log exercise/wellness activities
2. **Create Coaching Session** - Schedule coaching
3. **Create Social Event** - Plan team events
4. **Get Sentiment Reports** - View team sentiment data

## Error Handling

### Common Status Codes

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid request parameters
- **401 Unauthorized** - Missing or invalid authentication token
- **403 Forbidden** - Insufficient permissions (require Admin/HR role)
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

### Troubleshooting

**401 Unauthorized Error**
- Ensure `authToken` is set in your environment
- Check if the token has expired and re-login if needed

**403 Forbidden Error**
- Some endpoints require specific roles (Admin, HR, Manager)
- Verify your account role

**Connection Refused**
- Ensure the server is running on port 5000
- Check if you're using the correct environment (Dev vs Production)

## Running Tests

You can use Postman's built-in test runner or set up automation:

1. Click **Collections** on the left
2. Select **NexusHR - Modern Employee Management Platform**
3. Click the **Run** button
4. Select endpoints to test
5. Choose your environment
6. Click **Start Test Run**

## Additional Notes

### Authentication Requirements
- Endpoints marked with `protect` middleware require authentication
- Admin/HR restricted endpoints are noted in the descriptions

### File Upload Endpoints
Endpoints that accept file uploads:
- `POST /api/employees` - Avatar upload
- `POST /api/documents` - Document upload
- `POST /api/expenses` - Receipt upload

These use `form-data` format in the request body.

### Base URL Configuration
- **Development**: `http://localhost:5000`
- **Production**: `https://api.nexushr.com`
- Update the `baseUrl` variable when switching environments

## Support & Documentation

For detailed API documentation and endpoint specifications, refer to the source code controllers located in the `controllers/` directory:

- `authController.js` - Authentication logic
- `employeeController.js` - Employee management
- `attendanceController.js` - Attendance tracking
- And more for each feature area

## Version

- **API Version**: 1.0
- **Last Updated**: March 10, 2024
- **Collection Version**: 1.0

---

**Happy Testing!** 🚀
