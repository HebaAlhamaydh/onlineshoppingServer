
const itemsModel = (sequelize, DataTypes) => sequelize.define('items', {
 
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING },
  },{ timestamps: false });
  
    module.exports = itemsModel;