const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Favourite",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
