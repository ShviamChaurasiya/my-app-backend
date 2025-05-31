# 🧠 Task Manager Backend

This is the backend API for the **Task Manager** application. Built using **Node.js**, **Express.js**, **Sequelize**, and **PostgreSQL**, this backend handles user authentication, task CRUD operations, file uploads, role-based access control, and more.

---

## ✨ Features

- ✅ User registration and login with secure password hashing
- 🔐 JWT-based authentication and session management
- 👮 Role-based access control (Admin, User)
- 📋 Full CRUD operations for users and tasks
- 📁 File uploads using Multer
- 📦 PostgreSQL integration using Sequelize ORM
- 🐳 Docker support for containerized deployment
- 🧪 Testing-ready architecture
- 📚 Clean code, modular structure, and full documentation

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **Sequelize** ORM + **PostgreSQL**
- **bcrypt** for password hashing
- **JWT** for secure authentication
- **Multer** for file uploads
- **dotenv** for environment config
- **Docker** & **Docker Compose**

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or above)
- PostgreSQL
- npm or yarn
- Docker (optional)

### Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-backend.git
cd task-manager-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root and fill in:

```env
PORT=5000
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_jwt_secret
```

### Run Migrations

```bash
npx sequelize-cli db:migrate
```

### Start the Server

```bash
npm run dev
```

Server should be running on: `http://localhost:5000`

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Endpoint              | Description            |
|--------|-----------------------|------------------------|
| POST   | `/api/users/register` | Register a new user    |
| POST   | `/api/users/login`    | Login and get token    |

### 👤 Users

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | `/api/users`     | Get all users (admin only) |
| GET    | `/api/users/:id` | Get a specific user        |
| PUT    | `/api/users/:id` | Update a user              |
| DELETE | `/api/users/:id` | Delete a user              |

### ✅ Tasks

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | `/api/tasks`     | Get all tasks        |
| POST   | `/api/tasks`     | Create a new task    |
| GET    | `/api/tasks/:id` | Get task by ID       |
| PUT    | `/api/tasks/:id` | Update task by ID    |
| DELETE | `/api/tasks/:id` | Delete task by ID    |

---

## 🗂️ Project Structure

```
task-manager-backend/
│
├── src/
│   ├── controllers/      # Route logic
│   ├── middleware/       # Auth, error handling
│   ├── models/           # Sequelize models
│   ├── routes/           # Express routers
│   ├── uploads/          # Uploaded files
│   ├── app.js            # Express app entry
│   └── server.js         # Server setup
│
├── config/               # Sequelize config
├── migrations/           # DB migrations
├── .env                  # Environment variables
├── Dockerfile            # Docker config
├── docker-compose.yml    # Docker services
└── README.md             # This file
```

---

## 🐳 Docker Setup (Optional)

### Build and Run with Docker

```bash
docker-compose up --build
```

Ensure your `docker-compose.yml` includes your `backend`, `postgres`, and `pgadmin` services.

---

## 🧪 Testing

> You can add Jest or Mocha/Chai for testing. Here's a sample structure:

```
tests/
├── auth.test.js
├── tasks.test.js
└── users.test.js
```

Run tests using:

```bash
npm test
```

---

## ⚠️ Troubleshooting

- **`SequelizeHostNotFoundError`**: Check your database hostname or VPN settings.
- **`bcrypt` mismatch**: Make sure bcrypt version is consistent (`npm list bcrypt`).
- **JWT errors**: Double-check `JWT_SECRET` in your `.env` file.

---

## 🙌 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit and push (`git commit -m "Added feature"` and `git push`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Shivam Chaurasiya**  
Final Year Computer Science Student  
GitHub: [@shivamchaurasia](https://github.com/shivamchaurasia)  
Email: your.email@example.com  

---

> _“Code with clarity, test with precision, and build with confidence.”_
