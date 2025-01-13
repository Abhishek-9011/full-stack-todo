const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const todoSchema = new Schema({
  todoTitle: String,
  todoDescription: String,
  todoDate: String,
  todoStatus: String,
  todoCreator: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const todoModel = mongoose.model("todos", todoSchema);

module.exports = {
  userModel,
  todoModel,
};
