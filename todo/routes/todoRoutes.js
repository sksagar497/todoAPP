const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { sequelize, Todo, User } = require("../models");

router.get("/", async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  const todo = await Todo.findAll({ where: { userId: userId } });
  res.status(201).json(todo);
});

router.get("/filter", async (req, res) => {
  const { userId, status } = req.query;
  console.log(userId);
  console.log("-------------_ " + status);
  const todo = await Todo.findAll({
    where: { userId: userId, status: status },
  });
  res.status(201).json(todo);
});

router.get("/:id", async (req, res) => {
  const todo = await Todo.findOne({ where: { id: req.params.id } });
  if (!todo) {
    return res.status(401).send("invalid id for process");
  }
  res.status(201).json(todo);
});

router.post("/", async (req, res) => {
  // console.log("============================="+userId);
  const { name, userId, description, time, status } = req.body;
  console.log("-----------------" + userId);
  // return;
  try {
    const id = uuidv4();
    // const user = await User.findOne({ where: { email: email } });
    // const userId = user.id;

    const todo = await Todo.create({
      name,
      description,
      time,
      status,
      id,
      userId,
    });
    console.log("-------------------" + todo.userId);

    console.log("->->->->->->" + userId);
    await todo.save();
    return res.status(201).send({ todo: "created successfully... !!" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, description, time, status } = req.body;
  console.log("->>>>>>>>>>>> req.body",req.body);
  try {
    const todo = await Todo.findOne({ where: { id: id } });
    if (!todo) {
      return res.status(401).send("invalid id for updating");
    }
    await todo.update({
      name: name,
      description: description,
      time: time,
      status: status,
    });
    await todo.save();
    return res.status(201).json(todo);
  } catch (err) {
    res.status(501).send({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { id: req.params.id } });
    await todo.destroy();
    res.status(201).send({ task_deleted: "task deleted successfully.." });
  } catch (err) {
    res.status(501).send({ error: err });
  }
});

module.exports = router;
