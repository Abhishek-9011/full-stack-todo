const { Router } = require("express");
const userRouter = Router();
const { todoModel, userModel } = require("../db");
const { userMiddleware } = require("../Middleware/userMiddleware");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET); 

userRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const isAlreadyExist = await userModel.findOne({ email });
  if (isAlreadyExist) {
    return res.json({
      message: "User already exists",
    });
  }
  await userModel.create({ username, email, password });
  res.json({
    message: "Successfully signed up",
  });
});


userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const isAlreadyExist = await userModel.findOne({ email });
  if (!isAlreadyExist) {
    return res.json({
      message: "User does not exist",
    });
  }
  if (isAlreadyExist.password !== password) {
    return res.json({
      message: "Password does not match",
    });
  }
  
  const token = jwt.sign({ id: isAlreadyExist._id.toString() }, process.env.JWT_SECRET);
  res.json({ token });
});

userRouter.post("/todos", userMiddleware, async (req, res) => {
  const { todoTitle, todoDescription, todoDate, todoStatus } = req.body;
  const userId = req.userId; 
  await todoModel.create({
    todoTitle,
    todoDescription,
    todoDate,
    todoStatus,
    todoCreator: userId,
  });
  res.json({
    message: "Todo successfully created",
  });
});

userRouter.get("/todos/preview", userMiddleware, async (req, res) => {
  const userId = req.userId; 
  const todos = await todoModel.find({ todoCreator: userId });
  res.json(todos);
});

module.exports = {
  userRouter,
};
