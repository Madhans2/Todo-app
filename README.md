# Todo Task Manager

This is a full-stack [Todo Task](https://github.com/Madhans2?tab=repositories)
  Management Web Application that allows users to:

- Sign in via social logins (**Google**)
- Manage **personal and shared tasks**
- Perform full **CRUD operations**
- **Filter** and **sort** tasks
- **Collaborate** by sharing tasks with others

---

## ✨ Features

✅ User authentication via **OAuth 2.0 (Google, GitHub, Facebook)**  
✅ JWT-based session management  
✅ Tasks scoped per user and shared users  
✅ **Real-time updates**  
✅ Pagination & sorting  
✅ Rate limiting and input validation  
✅ Modular backend with **Express.js controllers**  
✅ Clean, animated frontend with **React.js + Tailwind CSS / Bootstrap**

---

### 🔧 Tech Stack

- **Frontend:** React.js, Axios, React Router Dom, Bootstrap  
- **Backend:** Node.js, Express.js, JWT, OAuth2, Passport.js  
- **Database:** MongoDB with Mongoose   
- **Deployment:** Render / Vercel / MongoDB Atlas

---

## ⚙️ Local Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Madhans2/Todo.git
```

after cloning, run the following commands
```bash
cd todo-app-frontend
cd todo-app-backend
npm install
npm start //nodemon
```

2.Environmental Variables for backend

`API_KEY`

`ANOTHER_API_KEY`

`PORT`

`MONGO_URI= your-mongodb-url`

`JWT_SECRET= secret`

`CLIENT_URL= frontend`

`GOOGLE_CLIENT_ID=your-google-client-id`

`GOOGLE_CLIENT_SECRET=your-google-client-secret`


3.Frontend

run the command in root todo-app folder

```bash
cd ../frontend
npm install
```
4.create .env in frontend folder

`VITE_API_URL = your-backend-api`


5.Start frontend
```bash
npm run dev
```

## 🏗️ Project Architecture

![Todo-Diagram](./docs/architecture.png)

## Project Demo
[ Project Demo Video]
[Desktop View](https://drive.google.com/file/d/12_nlN7Fb0_pb5vBDdyEx1h-dHkBLUJO4/view?usp=drivesdk)
[Mobile View](https://drive.google.com/file/d/13wqxjcgdGQHnRFLE7-dirRZi2rrJ0Pic/view?usp=drivesdk)



<p align="center"><strong>******** Thank you for Reading ********</strong></p>
