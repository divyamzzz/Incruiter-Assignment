# Backend Assessment for Incruiter SDE Intern

This project is a **backend assessment** for the **Incruiter SDE Intern** role. The backend is built using **Node.js, Express.js, and MongoDB**, providing user authentication, password reset, and session handling with JWT authentication.

## 🚀 Deployment Link
You can access the deployed version of the application here:
[**Deployed Link**](https://incruiter-assignmetn.onrender.com/) 

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose ORM)
- **JWT Authentication**
- **Bcrypt.js** (for password hashing)
- **EJS** (for templating)
- **Dotenv** (for environment variables management)

## 📂 Project Structure
```
├── public/                # Static files (CSS, JS, Images)
├── views/                 # EJS templates (Frontend)
│   ├── index.ejs          # Login page
│   ├── signup.ejs         # Signup page
│   ├── dashboard.ejs      # User dashboard
│   ├── reset-password.ejs # Password reset page
├── .env                   # Environment variables (hidden)
├── app.js                 # Main application file
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## ⚙️ Local Setup
Follow these steps to set up the project locally:

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   - The `.env` file is hidden. You can request access by emailing me at [divyam.singh.2875@gmail.com](mailto:divyam.singh.2875@gmail.com).
   - Once received, place it in the root directory of the project.

4. **Run the application**
   ```sh
   nodemon app.js
   ```
   The server will start on `http://localhost:3000/`

## 📌 Features
✅ **User Authentication** (Signup, Login, Logout)
✅ **JWT-based Authorization**
✅ **Password Hashing with Bcrypt**
✅ **Session Management with Cookies**
✅ **Password Reset Functionality**
✅ **Secure MongoDB Connection**
✅ **EJS-based UI Rendering**

## 📝 API Endpoints
| Route             | Method | Description |
|------------------|--------|-------------|
| `/`              | GET    | Login page |
| `/signup`        | GET    | Signup page |
| `/signup`        | POST   | Register a new user |
| `/login`         | POST   | Authenticate user & issue JWT |
| `/dashboard`     | GET    | User dashboard (Protected) |
| `/logout`        | GET    | Logout & clear session |
| `/reset-password` | GET    | Password reset page |
| `/reset-password` | POST   | Reset user password |

## 📧 Contact
For any queries, feel free to reach out at [divyam.singh.2875@gmail.com](mailto:divyam.singh.2875@gmail.com).

---
Made with ❤️ by **Divyam Singh**

