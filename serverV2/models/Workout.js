const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
  {
    // pokemonCardObj: {
    //     type: Object,
    //     required: [true, "Please provide Pokemon Card Object"]
    // },
    workout_id: {
      type: String,
      required: [true, "Please provide card id"],
      maxlength: 50,
    },
    workout_name: {
      type: String,
      required: [true, "Please provide workout name"],
      maxlength: 50,
    },
    workout_set: {
      type: Number,
      required: [true, "Please provide set number"],
      maxlength: 50,
    },
    workout_rep: {
      type: Number,
      required: [true, "Please provide rep number"],
      maxlength: 50,
    },
    workout_weight: {
      type: Number,
      required: [true, "Please provide weight number"],
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user email"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", WorkoutSchema);
