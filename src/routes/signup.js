'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const signUpRouter = express.Router();


const { users } = require('../models/index');



signUpRouter.post('/signup',async(req,res)=>{
  try {
    const {  role,email, username, password } =req.body
    const passwordhash = await bcrypt.hash(password, 10);
      const record = await users.create({ role: role, username: username, password: passwordhash,  email: email});
      res.status(201).json(record);
    } catch (e) { res.status(500).send('Error Creating User'); }

})

module.exports=signUpRouter;