# Login & Register — Full Stack Authentication System

A full-stack authentication system with real user registration and login, built with a clean frontend and a secure backend using JWT authentication.

This project demonstrates how a real-world authentication flow works, from UI to database persistence.

---

## 🚀 Live Demo

- Frontend: (to be added after deploy)
- Backend API: (to be added after deploy)

---

## 📌 Features

### Frontend
- Responsive login and registration UI
- Modal-based authentication flow
- Password visibility toggle
- Mobile hamburger navigation
- Real API integration with backend
- JWT token storage (localStorage)
- Protected actions using token

### Backend
- User registration with password hashing
- Secure login with JWT authentication
- Protected routes with middleware
- MongoDB Atlas persistence
- Environment-based configuration

---

## 🛠️ Technologies

### Frontend
- HTML5
- CSS3 (Flexbox, Media Queries)
- Vanilla JavaScript
- Ionicons

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- dotenv
- CORS

---

## 🔐 Authentication Flow

1. User registers via frontend form
2. Password is hashed before saving to database
3. User logs in with email and password
4. Backend validates credentials
5. JWT token is generated and returned
6. Token is stored on the client
7. Protected routes require a valid token

---

## ⚙️ How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in `/backend`:

```env
PORT=3333
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend
Open `index.html` in your browser.

---

## 📂 Project Structure

```txt
Login_and_Register/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── package.json
│   └── .env (ignored)
├── index.html
├── style.css
├── script.js
├── assets/
└── README.md
```

---

## 🎯 Purpose

This project was built to practice and demonstrate:

- Full-stack authentication
- Secure user management
- Backend architecture with Express
- Frontend and backend integration
- Real-world JWT-based security

---

## 📷 Preview

### Desktop
![Desktop Preview](assets/preview/desktop.png)

### Mobile
![Mobile Preview](assets/preview/mobile.png)

---

## 👤 Author

**Pedro Monteiro**  
Full Stack Developer

- GitHub: https://github.com/PedroMJK
- LinkedIn: https://www.linkedin.com/in/pedro-monteiro-3173b8241/
