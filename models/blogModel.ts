import mongoose from "mongoose";

interface BlogType extends mongoose.Document {
  name: string;
  publisher: string;
  time: Date;
  content: string;
  plan: string;
  views: Array<Object>;
  tags: Array<string>;
}

const viewSchema = new mongoose.Schema({
  id: String,
  time: {
    type: Date,
    default: Date.now(),
  },
});

const blogSchema = new mongoose.Schema<BlogType>({
  name: {
    type: String,
    required: [true, "You have to provide a blog name"],
  },
  publisher: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    minlength: 10,
    required: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ["normal", "premium"],
    default: "normal",
  },
  views: {
    type: [viewSchema],
    sparse: true,
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
