const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchSchema = new Schema({
  movieId: {
    type: String,
    required: true,
  },
  poster: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Watch", watchSchema);
