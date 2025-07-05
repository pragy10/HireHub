# HireHub - Job Portal

A comprehensive job portal application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring role-based authentication, CRUD operations, and modern UI/UX.

## 🚀 Quick Start

### Option 1: Using the Startup Script (Recommended)
1. Double-click `start-hirehub.bat` to automatically start both backend and frontend servers
2. Wait for both servers to start
3. Open your browser and go to the frontend URL shown in the terminal

### Option 2: Manual Start
1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```
   
2. **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

## 🔧 Setup Instructions

### 1. Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend directory with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hirehub
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

### 2. Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🌐 Access URLs

- **Frontend:** http://localhost:5173 (or similar port)
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based authentication** (Employer, Job Seeker, Admin)
- JWT token-based authentication
- Protected routes based on user roles
- Secure password hashing with bcrypt

### 👥 User Management
- **Job Seekers**: Can browse jobs, apply, track applications, manage profile
- **Employers**: Can post jobs, manage applications, view analytics
- **Admins**: Full system access and user management

### 💼 Job Management
- **CRUD Operations** for job postings
- Advanced search and filtering
- Job application tracking
- Salary range specifications
- Job type and experience level categorization

### 🎯 Job Applications
- Easy application submission
- Application status tracking
- Cover letter and resume upload
- Employer application management

### 🔍 Search & Filtering
- Text-based search across job titles, companies, descriptions
- Location-based filtering
- Job type filtering (Full-time, Part-time, Contract, etc.)
- Experience level filtering
- Salary range filtering
- Sort by date, salary, etc.

### 📊 Dashboard & Analytics
- **Job Seeker Dashboard**: Applied jobs, saved jobs, profile views
- **Employer Dashboard**: Posted jobs, applications, analytics
- Real-time statistics and insights

### 📱 Responsive Design
- Modern, responsive UI built with CSS Grid and Flexbox
- Mobile-first approach
- Beautiful animations and transitions
- Professional color scheme and typography

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-fileupload** - File upload handling
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **React Hook Form** - Form handling
- **Date-fns** - Date utilities

## 📁 Project Structure

```
HireHub/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Jobs.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   └── userRoutes.js
│   ├── config.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── JobList.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   ├── PostJob.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AppliedJobs.jsx
│   │   │   └── EmployerDashboard.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── start-hirehub.bat
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users/applied-jobs` - Get applied jobs
- `POST /api/users/upload-resume` - Upload resume

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (employers only)
- `PUT /api/jobs/:id` - Update job (owner/admin only)
- `DELETE /api/jobs/:id` - Delete job (owner/admin only)
- `POST /api/jobs/:id/apply` - Apply for job
- `GET /api/jobs/employer/jobs` - Get employer's jobs
- `PUT /api/jobs/application/status` - Update application status

## 🎯 Usage Guide

### For Job Seekers
1. Register/Login as a job seeker
2. Browse available jobs using search and filters
3. Apply to jobs with cover letter and resume
4. Track application status in the dashboard
5. Update profile with skills, experience, and education

### For Employers
1. Register/Login as an employer
2. Post new job openings with detailed descriptions
3. Manage applications and update status
4. View analytics and insights
5. Update company profile

## 🔧 Troubleshooting

### Common Issues

1. **Backend not starting:**
   - Check if MongoDB is running
   - Verify `.env` file exists and has correct values
   - Check if port 5000 is available

2. **Frontend showing blank page:**
   - Check browser console for errors
   - Verify backend is running on port 5000
   - Check if all dependencies are installed

3. **Database connection issues:**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify network connectivity

4. **CORS errors:**
   - Backend CORS is configured for development
   - Check if frontend is running on correct port

### Error Messages

- **"Missing parameter name"**: Route order issue (fixed)
- **"ECONNREFUSED"**: Backend not running
- **"Network Error"**: Check backend connection

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Use PM2 or similar process manager
3. Configure MongoDB Atlas or production database
4. Set up proper CORS for production domain

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update API base URL for production
4. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the troubleshooting section
2. Review the console logs
3. Open an issue in the repository

---

**HireHub** - Connecting talented professionals with amazing opportunities! 🚀

*Built with ❤️ using the MERN stack* 