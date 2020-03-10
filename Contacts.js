var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  user: Schema.Types.ObjectId,
  contacts: [Schema.Types.ObjectId]
});

module.exports = Contacts = mongoose.model("contact", ContactSchema);
