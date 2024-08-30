const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Riderschema = new schema({
  displayName: {
    type: String,
  },
  userPrincipalName : {
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
