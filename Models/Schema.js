const mongoose =require('mongoose');
const menuSchema = new mongoose.Schema({
  Item: {
        type: String,
        required: true
    },
    Taste : {
      type: String,
      enum : ['sweet','delicious','salty','tasty'],
      required: true
    },
    Isdrink : {
      type: Boolean,
      required:true
    },
    Ingredients:{
      type: String,
      required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Category:{
        type: String,
        enum: ['Starter', 'Main Course', 'Dessert'],
        required: true
    }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;