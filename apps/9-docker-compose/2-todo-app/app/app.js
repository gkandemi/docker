const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { TodoModel } = require("./TodoModel");
const Mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  TodoModel.find({})
    .then((todoList) => res.status(200).json(todoList))
    .catch((e) => res.status(500).json(e));
});

app.post("/todo", (req, res) => {
  const todo = new TodoModel({
    ...req.body,
    created_at: new Date(),
  });

  todo
    .save()
    .then((savedTodo) => res.status(200).json(savedTodo))
    .catch((e) => res.status(400).json(e));
});

app.listen(PORT, async () => {
  console.log(`Sunucu çalışıyor... ${PORT} | MongoDB'ye bağlanılacak..`);
  await Mongoose.connect("mongodb://mongodb:27017/todos2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB'ye bağlantı başarılı!");
});
