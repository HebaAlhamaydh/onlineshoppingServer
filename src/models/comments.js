"use strict";

const comments = (sequelize, DataTypes) =>
  sequelize.define("comments", {
    comment: {
      type: DataTypes.STRING,
    },
    // userID: {
    //   type: DataTypes.INTEGER,
    // },
    // itemsID: {
    //   type: DataTypes.INTEGER,
    // },
  });

module.exports = comments;