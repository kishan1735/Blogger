import mongoose from "mongoose";

interface UserType extends mongoose.Document {
  name: string;
  email: string;
  blogs: Array<String>;
  transactionHistory: Array<Object>;
  walletBalance: number;
}

const historySchema = new mongoose.Schema({
  amount: { type: Number },
  time: { type: Date, default: Date.now() },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required for SignIn"],
  },
  blogs: {
    type: [String],
    sparse: true,
    default: [],
  },
  walletBalance: { type: Number, default: 0 },
  transactionHistory: {
    type: [historySchema],
    default: [],
    sparse: true,
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
