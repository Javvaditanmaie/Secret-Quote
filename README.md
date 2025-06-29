#  JWT Authentication API – "Secret Quote"
This project demonstrates **stateless authentication** using **JSON Web Tokens (JWT)** in a simple Express.js API. It allows users to register, login, and access a protected "secret quote" if authenticated.


---

## Technologies Used

- Node.js
- Express
- JSON Web Token (`jsonwebtoken`)
- Body-parser 

---

##  Features

Register a user (in-memory, no DB)  
Login and receive a JWT token  
JWT token expires in 1 hour  
Protected route: `/api/secret-quote`  
Middleware to validate JWTs

---

## How to Test the API
I used POSTMAN
###  1. Register a New User
POST /register
Body (JSON):
<pre>
  {
  "username": "testuser",
  "password": "password123"
}
</pre>
output
<pre>
  {
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "testuser",
    "password": "password123"
  }
}
</pre>
![Screenshot 2025-06-29 190805](https://github.com/user-attachments/assets/8fb22977-27eb-4b1c-9b56-30386ff8e802)

### 2. Login to Get JWT
POST /login
Body (JSON):
<pre>
  {
  "username": "testuser",
  "password": "password123"
}
</pre>
![Screenshot 2025-06-29 190820](https://github.com/user-attachments/assets/bfe5bc42-dda9-4565-b98d-38cfabd2f314)
### 3. Access Protected Quote
GET /api/secret-quote
Headers:
Authorization: Bearer your.jwt.token.here
![Screenshot 2025-06-29 190619](https://github.com/user-attachments/assets/d0c0ebcb-de25-4867-bbc2-36bbb6d544eb)

# ### **Difficulty: Medium**

**Project: A User-Specific "To-Do List" API**
# User-Specific To-Do List API

This project is a secure RESTful API built with **Node.js**, **Express**, and **JWT** authentication. It allows users to **register**, **log in**, and **manage their personal to-do lists**. Admin users can view all to-dos across all users.

##  Features Implemented

-  User Registration (`/register`)
-  Secure Login with JWT (`/login`)
-  Password hashing using `bcrypt`
- Protected routes with token-based authentication middleware
- User-specific to-do CRUD:
  - `GET /api/todos` – only gets your own to-dos
  - `POST /api/todos` – creates a to-do for the logged-in user
  - `DELETE /api/todos/:id` – deletes a to-do if you are the owner
- Bonus: **Admin route**
  - `GET /api/admin/all-todos` – view all users' to-dos
-  Role-based authorization (`user` or `admin`)

---

## Technologies Used

- Node.js
- Express.js
- JSON Web Tokens (`jsonwebtoken`)
- Bcrypt (`bcrypt`)
- Body-parser

---
## post TODO
![Screenshot 2025-06-29 193243](https://github.com/user-attachments/assets/184b034f-9833-4531-b6c4-e232fbd14d05)
## get TODO
![Screenshot 2025-06-29 193323](https://github.com/user-attachments/assets/7fbfc1e9-cbae-4ca7-88c5-be238c1daa0f)

## Auth
POST /register

Registers a new user

Request Body:
<pre>
  {
  "username": "yourname",
  "password": "yourpassword",
  "role": "user"  // or "admin"
}

</pre>
![image](https://github.com/user-attachments/assets/56f2f60b-a43b-4a7f-b7e7-35cce70da085)
## POST /login

Logs in and returns a JWT

Request Body:
<pre>
  {
  "username": "yourname",
  "password": "yourpassword"
}
</pre>
![image](https://github.com/user-attachments/assets/5fa95d2c-1840-4dee-9549-4a73bb3a0211)
## To-Do Routes (Protected)
All routes below require an Authorization header:
Authorization: Bearer <your-jwt-token>
GET /api/todos

Returns to-dos created by the logged-in user

POST /api/todos

Adds a new to-do

Request Body:
<pre>
  {
  "task": "Buy groceries"
}
</pre>
![image](https://github.com/user-attachments/assets/282c5ea2-199a-4308-aa62-244d04b6f70e)

Get/api/todos
![image](https://github.com/user-attachments/assets/d2731997-0523-43de-843a-26671511fd43)

Get /api/Admin/all-todos
![image](https://github.com/user-attachments/assets/a4d8668f-b37e-41b8-ae9c-98b8d0203e64)
