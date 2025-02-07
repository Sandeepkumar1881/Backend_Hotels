const mongoose = require('mongoose');
const personSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age : {
      type: Number,
      required: true
    },
    Isstaff : {
      type: Boolean,
      required:true
    },
    Work :{
      type: String,
      enum : ['Staff','Manager','Chef'],
      required: true
    },
    Salary:{
        type: Number,
        required: true
    }
});

const Person = mongoose.model('person', personSchema);
module.exports = Person;