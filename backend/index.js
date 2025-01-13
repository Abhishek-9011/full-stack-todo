const express = require("express");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routes/user");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
async function main() {
    await mongoose.connect( "mongodb+srv://abhishek774901:Jq3k8nyWi9zfxtS9@cluster0.xt6sa.mongodb.net/fullstack-todo");
    app.listen(3000);
  }
  main();
  