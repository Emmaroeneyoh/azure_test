const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Riderschema = new schema({
  firstname: {
    type: String,
  },
  lastname : {
    type: String,
  },
  email: {
    type: String,
  },

  password: {
    type: String, default :""
  },
  

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const userModel = mongoose.model("user", Riderschema);
module.exports = {
  userModel,
};
