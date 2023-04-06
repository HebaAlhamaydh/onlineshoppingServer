"use strict";
const express = require("express");
const router = express.Router();
const { items, users } = require("../models/index");
const bearer = require("../middlewares/bearerAuth");
const { Op } = require("sequelize");

router.get("/item", bearer, handleGetAll);
router.get("/item/:id", bearer, handleGetOne);
router.post("/item", bearer, handleCreate);
router.put("/item/:id", bearer, handleUpdate);
router.delete("/item/:id", bearer, handleDelete);


////////////// Get All Records//////////
async function handleGetAll(req, res) {

  let allRecords = await items.findAll();

  res.status(200).json(allRecords);
}

//////////////////Get one Records/////////
async function handleGetOne(req, res) {
  const id = req.params.id;

  let readOne = await items.findOne({where:{id:id}});
  res.status(200).json(readOne);
  if (!readOne) res.status(404).send("Error");
 
}
///////////////// Create records//////////////
async function handleCreate(req, res) {
  const tokenId = req.user.id;
  const obj = req.body;

    if (req.body.userId === tokenId ) {
      let newRecord = await items.create(obj);
      res.status(201).json(newRecord);
    } else {
      res.status(404).send("you are not allowed to post here");
    } 
}

// // (Update records)user can update on his items .. but not allow edit on items users.

async function handleUpdate(req, res) {
  const tokenId = req.user.id;
 
  const newUpdate = req.body;

  let ID = req.params.id;
  const found = await items.findOne({ where: { id: ID } });

  if (tokenId === found.userId ) {

    let updateItems = await found.update(newUpdate);
    res.status(201).json(updateItems);
  } else {
    res.status(404).send("can't find the user !");
  }
}

// Delete records
async function handleDelete(req, res) {
  const tokenId = req.user.id;
  const role = req.user.role;
  const ID = req.params.id;
  try {
    const foundUser = await items.findOne({ where: { id: ID } });

    if (tokenId === foundUser.userId ) {
      const deletes = await foundUser.destroy(foundUser.id);
      res.status(204).send("Deleted successfully");
    } else {
      res.status(404).send("Access denied");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = router;
