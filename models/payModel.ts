import mongoose from "mongoose";

const paySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "You have provide an amount"],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  buyerId: {
    type: String,
    required: [true, "You have to provide a buyer id"],
  },
});

const Pay = mongoose.models.Pay || mongoose.model("Pay", paySchema);

export default Pay;
