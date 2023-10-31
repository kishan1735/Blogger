import mongoose from "mongoose";

interface UserType extends mongoose.Document {
  name: string;
  email: string;
  blogs: Array<String>;
  wallet: Array<Object>;
}

const historySchema = new mongoose.Schema({
  to: { type: String, required: true },
  from: { type: String, required: true },
  amount: { type: Number, required: true },
  time: { type: Date, default: Date.now() },
});
const walletSchema = new mongoose.Schema({
  total: {
    type: Number,
    default: 0,
  },
  history: {
    type: [historySchema],
    default: [],
  },
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
  wallet: {
    type: walletSchema,
    sparse: true,
    default: [],
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
