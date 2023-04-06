'use strict';
require('dotenv').config();
const cors = require("cors");
const PORT = process.env.PORT || 3034;
const express = require("express");
const app = express();
app.use(cors("*"));
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");

const signup=require("./routes/signup")
const signin=require("./routes/signin")
const routeritems=require("./routes/items")
const routerCart=require('./routes/cart')
const routerApi = require('./routes/api');
const myItems=require("./routes/myItems")

app.get("/", (req, res) => {
    res.send("welcome to onlineShop Homepage");
  });
  
  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///router
app.use(signup);
app.use(signin);
app.use(routeritems)
app.use(myItems)
app.use(routerCart)
app.use(routerApi)

app.use("*", notFoundHandler);
app.use(errorHandler); 

function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};