const express = require("express");
const router = express.Router();

const { sequelize, User } = require("../models");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  res.send("user route working fine");
});

router.post("/register", async (req, res) => {
  const { name, mobile, gender, country, hobbies, email, password } = req.body;
//   console.log("req of body----->",req.body);
  try {
    
    const existingUser = await User.findOne({where: {mobile: mobile}});
    if(existingUser){
        console.log("existing user error")
        return res.status(400).send({error: "user with given mobile is already existed"})
    }
    const existingUser1 = await User.findOne({where: {email: email}});
    if(existingUser1){
        console.log("existing user 1 error")
        return res.status(400).send({error: "user with given email id is already existed"})
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    const isvalidEmail =  emailRegex.test(email);
    if(isvalidEmail == false){
        return res.status(400).send({error: " given email id is not correct"})
    }

    const isvalidMobile =  mobileRegex.test(mobile);
    if(isvalidMobile == false){
        return res.status(400).send({error: " given mobile no. doesnot exist"})
    }

    const id = uuidv4();

    const user = await User.create({
        id,
      name,
      mobile,
      gender,
      country,
      hobbies,
      email,
      password,
    });
    // console.log("-----------user-----------",user);
    await user.save();
    return res.status(201).json( user );
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete("/", async (req, res) => {
    const { email } = req.body;
    try{
        const tempUser = await User.findOne({
            where: {
                email:email
            }
        })
        if(tempUser){
            await tempUser.destroy();
            return res.status(201).send({deleted_user:"User deleted successfully.."})
        }
        else{
            return res.status(400).send({does_not_exist:"not exist user, register yourself first"})
        }
    }
    catch(err){
        return res.status(500).send("You have entered wrong email address..")
    }
})
module.exports = router;
