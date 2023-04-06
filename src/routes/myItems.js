'use strict';

const express = require('express');
const router = express.Router();
const MyItemsRouter = express.Router();
const {items} = require('../models/index');
const bearer = require('../middlewares/bearerAuth');

MyItemsRouter.get('/myItems',bearer,handelMyServices)

async function handelMyServices(req,res){

const token = req.user.id

const myItems = await items.findAll({where:{userId:token}})

res.status(200).send(myItems)

}
module.exports = MyItemsRouter