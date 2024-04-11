const express = require("express");
const router = express.Router();

const { sequelize, User } = require("../models");

router.get("/", (req, res) => {
  res.send("login api is working properly...");
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findAll({
            where: {
                email: email,
                password: password
            }
        });
        console.log(userExist)
        if (userExist.length > 0) {
            return res.status(200).json(userExist);
        } else {
            return res.status(401).send({ error: "User credentials are not valid" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Internal server error" });
    }
});

module.exports = router;
