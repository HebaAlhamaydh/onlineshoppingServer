"use strict";

const comments = (sequelize, DataTypes) =>
  sequelize.define("comments", {
    comment: {
      type: DataTypes.STRING,
    },
  
  });

module.exports = comments;