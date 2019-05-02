const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('commission', {
  id:{
    field: 'id',
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    field: 'title',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Title is required'
      }
    }
  },
  description: {
    field: 'description',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Description is required'
      }
    }
  },
  price: {
    field: 'price',
    type: Sequelize.INTEGER,
    validate: {
      isNumeric:{
        args: true,
        msg: 'Milliseconds must be numeric'
      }
    }
  },
  workTime:{
    field: 'workTime',
    type: Sequelize.INTEGER,
    validate: {
      isNumeric:{
        args: true,
        msg: 'Milliseconds must be numeric'
      }
    }
  },
  slots: {
    field: 'slots',
    type: Sequelize.INTEGER,
    validate: {
      isNumeric:{
        args: true,
        msg: 'Milliseconds must be numeric'
      }
    }
  }
},{
  timestamps:false
});
