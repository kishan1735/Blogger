import mongoose from "mongoose";

interface UserType extends mongoose.Document {
  name: string;
  email: string;
  blogs: Array<String>;
}

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
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
