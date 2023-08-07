
const User = require('../models/User');
const bcrypt= require('bcrypt');
const {secret} = require('../common');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
router.get('/', async (req, res) => {
    let users=await User.find();
    res.send(users);
    res.end();
});
router.delete('/:id', async (req, res) => {
  try{
    await User.deleteOne({
        _id:req.params.id
    })
    res.status(200);
    res.send(await User.find());
    res.end();
  }
  catch(err){
    console.log(err);
  };
 
});
router.post('/trylogin', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = jwt.sign({
          _id: user._id,
          username: user.username
        },secret);
        res.send({
          token: token,
          username: user.username,
          email: user.email
        });
      } else {
        res.status(401).send('Invalid credentials');
      }
      res.end();
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).send('Internal Server Error');
  }
});
router.post("/post", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      fullname: req.body.fullname,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.put('/:id',async(req, res)=>{
    const id=req.params.id;
    const user=await User.findOne({
      _id:id
    }) 
    if(user)
    {
        user.username=req.body.username;
        user.password=req.body.password;
        user.email=req.body.email;
        user.fullname=req.body.fullname;
   
    } 
    try{
      await user.save();
      res.send(user);
      res.end();
    }
    catch(err) {
      console.error(err);
    };
  });
module.exports = router;