"use strict";

const cart = (sequelize, DataTypes) =>
  sequelize.define("cart", {
    addToCart: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    amount: { type: DataTypes.INTEGER,
        defaultValue: 0,
    },

  });

module.exports = cart;