var mongoose = require("mongoose");

var Contacts = require("./Contacts");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: String,
  phone: {
    type: Number,
    required: true
  },
  DOB: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre("deleteOne", function(next) {
  //cleanup
  var self = this;
  Contacts.deleteOne({ email: self.email }).then(resp => {
    console.log(resp);
  });

  next();
});

module.exports = User = mongoose.model("user", UserSchema);
