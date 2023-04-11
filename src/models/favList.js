"use strict";

const favList = (sequelize, DataTypes) =>
  sequelize.define("favList", {
    addToFiv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  });

module.exports = favList;