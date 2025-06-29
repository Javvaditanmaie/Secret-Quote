const express=require('express');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const bodyparser=require('body-parser')
const users = []; 
const todos = [];
const app=express()
const port=3000
const JWT_Secret='mysecretkey123'
app.use(bodyparser.json())
app.post('/register',async (req,res)=>{
    const{username,password}=req.body;

    const existingUser=users.find(u=>u.username===username);
    if(existingUser){
        return res.status(409).json({message:'username already present'})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser={
        id:users.length+1,
        username,
        password:hashedPassword
    }
    users.push(newUser)
    res.status(201).json({ message: 'User registered successfully', user: newUser });
})
app.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    const user=users.find(u=>u.username===username);
    if(!user||!(await bcrypt.compare(password,user.password))){
        return res.status(401).json({message:'invalid username and password'})
    }
    const token=jwt.sign(
        {id:user.id,username:user.username},
        JWT_Secret,
        {expiresIn:'1h'}
    )
    res.json({accessToken:token})
})
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); 
    }
    jwt.verify(token, JWT_Secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
function authorizeAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}
app.post('/api/todos', authenticateToken, (req, res) => {
  const { task } = req.body;

  const newTodo = {
    id: todos.length + 1,
    task,
    userId: req.user.id
  };

  todos.push(newTodo);
  res.status(201).json({ message: 'To-do created', todo: newTodo });
});
app.get('/api/todos', authenticateToken, (req, res) => {
  const userTodos = todos.filter(todo => todo.userId === req.user.id);
  res.json(userTodos);
});
app.delete('/api/todos/:id', authenticateToken, (req, res) => {
  const todoId = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === todoId && todo.userId === req.user.id);

  if (index === -1) {
    return res.status(404).json({ message: 'To-do not found or unauthorized' });
  }

  todos.splice(index, 1);
  res.json({ message: 'To-do deleted' });
});
app.get('/api/admin/all-todos', authenticateToken, authorizeAdmin, (req, res) => {
  res.json(todos);
});

app.get('/api/secret-quote',authenticateToken,(req,res)=>{
    res.json({
        quote:"the secret to getting ahead is getting started"
    })

})

app.listen(port,()=>{
    console.log(`server is running${port}`)
})