"use strict";
require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const { Sequelize, DataTypes } = require("sequelize");

const itemsModel  = require('./items');
const userModel=require('./users');
const commentsModel = require("./comments");
const favListModel=require('./favList');
const cartModel=require('./cart')

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,
                    rejectUnauthorized: false},
                native: true
            }
        } : {};


// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const userTable = userModel(sequelize, DataTypes);//use sequelize to creat model
const itemsTable = itemsModel(sequelize, DataTypes);
const commentsTable = commentsModel(sequelize, DataTypes);
const favListTable=favListModel(sequelize,DataTypes);
const cartTable=cartModel(sequelize,DataTypes);


//relations

//////////////////////////
userTable.hasMany(itemsTable);
itemsTable.belongsTo(userTable);

////////////comments////

userTable.hasMany(commentsTable);
commentsTable.belongsTo(userTable);
itemsTable.hasMany(commentsTable);
commentsTable.belongsTo(itemsTable);


////////////favlist/////////////
userTable.hasMany(favListTable);
favListTable.belongsTo(userTable);
itemsTable.hasMany(favListTable);
favListTable.belongsTo(itemsTable);


//////////////cart////////
userTable.hasMany(cartTable);
cartTable.belongsTo(userTable);
itemsTable.hasMany(cartTable);
cartTable.belongsTo(itemsTable);

module.exports = {
    sequelize: sequelize,
    DataTypes:DataTypes,

    items:itemsTable,
    comments:commentsTable,
    cart:cartTable,
    favList: favListTable,
    users:userTable
};

