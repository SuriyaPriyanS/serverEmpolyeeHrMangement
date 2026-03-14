# Quick Start - NexusHR Postman Collections

## 📥 Import Files

1. Open Postman
2. Import these 3 files:
   - `NexusHR_API_Collection.postman_collection.json` (All API endpoints)
   - `NexusHR_Dev_Environment.postman_environment.json` (Local testing)
   - `NexusHR_Production_Environment.postman_environment.json` (Production)

## 🔑 Getting Started

### Step 1: Select Environment
- Click the environment dropdown (top right) in Postman
- Choose: **NexusHR - Development Environment**

### Step 2: Get Authentication Token
1. Go to **Authentication > Login User**
2. Enter credentials:
   ```json
   {
     "email": "your@email.com",
     "password": "YourPassword123!"
   }
   ```
3. Click **Send**
4. Copy the `token` from response
5. In Postman: **Environment Variables > authToken** 
6. Paste the token value and **Save**

### Step 3: Start Making Requests
All available endpoints are now accessible with your auth token automatically included!

## 📚 API Collection Structure

```
Authentication
├── Register User
├── Login User
├── Logout User
└── Get User Profile

Employees
├── Get All Employees
├── Get Employee by ID
├── Create Employee
├── Update Employee
└── Delete Employee

Attendance
├── Get Attendance Records
├── Clock In
└── Clock Out

Leave Requests
├── Get Leave Requests
├── Request Leave
└── Update Leave Status

Projects
├── Get All Projects
├── Create Project
├── Update Project
└── Delete Project

Payroll
├── Get Payroll Records
└── Create Payroll

Performance
├── Get Performance Reviews
└── Create Performance Review

Recruitment
├── Get Job Postings
├── Create Job Posting
└── Apply for Job

Onboarding
├── Get Onboarding Plan
└── Create Onboarding Plan

Learning
├── Get Courses
└── Create Course

Documents
├── Get Documents
└── Upload Document

Expenses
├── Get Expenses
└── Create Expense

Kudos
├── Get Kudos
└── Create Kudos

Standups
├── Get Standups
└── Create Standup

Wellness
├── Create Coaching Session
├── Create Video Request
├── Get Sentiment Reports
├── Create Sentiment Report
├── Get Wellness Logs
├── Create Wellness Log
├── Get Career Paths
├── Create Career Path
├── Get Social Events
└── Create Social Event

AI & Analytics
├── Save Team Recommendation
├── Save Assistant Chat
├── Get Dashboard Stats
└── Get Analytics
```

## 🌍 Environment Variables

### Development
- **URL**: `http://localhost:5000`
- Use for local testing

### Production  
- **URL**: `https://api.nexushr.com`
- Use for live API calls

## ⚡ Common API Calls

### User Registration
```
POST /api/auth/register
```

### User Login
```
POST /api/auth/login
```

### Get Employee Data
```
GET /api/employees
Headers: Authorization: Bearer {token}
```

### Create a Project
```
POST /api/projects
Headers: Authorization: Bearer {token}
Body: { name, description, startDate, endDate, budget, manager, status }
```

### Request Leave
```
POST /api/leaverequests
Headers: Authorization: Bearer {token}
Body: { leaveType, startDate, endDate, reason }
```

## 🔒 Authentication

- Most endpoints require authentication
- Include token in: `Authorization: Bearer {token}`
- Token is auto-included in all requests when set in environment

## ❓ Troubleshooting

| Issue | Solution |
|-------|----------|
| `401 Unauthorized` | Set `authToken` in environment variables |
| `Connection refused` | Ensure server running on port 5000 |
| `403 Forbidden` | Check user role (Admin/HR required for some endpoints) |
| `404 Not Found` | Verify resource ID exists |

## 📖 For More Details
See `POSTMAN_GUIDE.md` for comprehensive documentation.

---

**Ready to test the API!** 🎉
