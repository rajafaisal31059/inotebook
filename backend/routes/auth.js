const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, query, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "LASIAFAJARHAHA";







      // CREATE USER ENDPOINT
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid mail").isEmail(),
    body(
      "password",
      "Enter a valid password of 5 characters minimum."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);









    // LOGIN-ENDPOINT
router.post(
  "/login",
  [
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({error: "Please enter correct login information."})
      }
      const passwordCompare= await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error: "Please enter correct login information."})
      }
       
      const data={
        user:{
          id: user.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET)
      res.json({authtoken})


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error response.");
    }
  }
);










// GET USER DETAILs ENDPOINT
router.post(
  "/getuser", fetchuser , async (req, res) => {
try {
  userId=req.user.id;
  const user= await User.findById(userId).select("-password");
  res.send(user);

} catch (error) {

  console.error(error.message);
  res.status(500).send("Internal server error response.");
}
  })







module.exports = router;
