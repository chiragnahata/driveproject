# File Storage and Management System

## 📌 Project Overview
This is a **File Storage and Management System** built using **Node.js, Express, MongoDB, and Supabase Storage**. The application allows users to upload, store, and download files securely. Authentication is implemented using **JWT**.

## 🚀 Features
- User authentication (Register/Login with JWT)
- File upload using **Multer**
- File storage on **Supabase Storage**
- **Signed URLs** for secure file downloads
- File metadata stored in **MongoDB**

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Storage:** Supabase Storage
- **Authentication:** JWT, bcrypt
- **Validation:** Express-validator

## 📂 Project Structure
```
📦 file-management-system
├── 📂 config
│   ├── db.js             # MongoDB connection setup
│   ├── multer.config.js  # Multer & Supabase configuration
├── 📂 models
│   ├── user.model.js     # User schema
│   ├── file.model.js     # File schema
├── 📂 routes
│   ├── auth.routes.js    # Authentication routes
│   ├── file.routes.js    # File upload & download routes
│   ├── index.routes.js   # Main router
├── 📂 middlewares
│   ├── auth.js           # JWT authentication middleware
├── 📂 views              # Frontend templates (if using EJS)
├── 📜 server.js          # Entry point
├── 📜 package.json       # Dependencies & scripts
└── 📜 README.md          # Project documentation
```

## ⚙️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd file-management-system
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a **.env** file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_BUCKET=drive  # Your bucket name
```

### 4️⃣ Start the Server
```sh
npm start
```
The server runs on **http://localhost:5000**

## 🔑 Authentication Routes
| Method | Endpoint       | Description          |
|--------|--------------|----------------------|
| POST   | /register     | Register a new user |
| POST   | /login        | User login          |

## 📁 File Routes
| Method | Endpoint         | Description                  |
|--------|----------------|------------------------------|
| POST   | /upload-file    | Upload a file               |
| GET    | /download/:path | Download a file (Signed URL)|

## 🛡️ Middleware
- `authMiddleware`: Protects routes by verifying JWT tokens
- `upload`: Handles file uploads using Multer

## 🛠️ Future Enhancements
- Add user roles (admin/user)
- File previews and thumbnails
- Implement file sharing with permission control

---
### 💡 **Contributing**
Feel free to fork the repo and submit PRs. Open an issue if you find any bugs! 🚀

### 📜 **License**
This project is licensed under the **MIT License**.

---
_Developed by Somyadip Ghosh ❤️_

