const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
        writer:  {type : String, required: true},
  description:  {type : String, required: true},
      creator:  {type : mongoose.Schema.Types.ObjectId, ref: "User" ,required: true}
});


module.exports = mongoose.model('Quote', quoteSchema);
