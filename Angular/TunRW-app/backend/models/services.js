const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
        title:  {type : String, required: true},
  description:  {type : String, required: true},
    imagePath:  {type : String, required: false},
      creator:  {type : mongoose.Schema.Types.ObjectId, ref: "User" ,required: true}
});


module.exports = mongoose.model('Service', serviceSchema);
