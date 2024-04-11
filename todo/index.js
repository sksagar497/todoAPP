const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const port = 3005;

const userRoute = require("./routes/userRoutes");
const loginRoute = require("./routes/loginRoutes");
const todoRoute = require("./routes/todoRoutes");

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins
}));

app.use(bodyParser.json());
app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/todos", todoRoute);
app.get("/", (req, res) => {
  res.send("api is good to go");
});

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
