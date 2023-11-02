import mongoose from "mongoose";

interface TagType extends mongoose.Document {
  Techology: Array<string>;
  General: Array<string>;
  Sports: Array<string>;
  Education: Array<string>;
  Politics: Array<string>;
}

const tagSchema = new mongoose.Schema({
  Technology: {
    type: [String],
    default: [],
  },
  General: {
    type: [String],
    default: [],
  },
  Sports: {
    type: [String],
    default: [],
  },
  Education: {
    type: [String],
    default: [],
  },
  Politics: {
    type: [String],
    default: [],
  },
});

const Tag = mongoose.models.tag || mongoose.model("Tag", tagSchema);

export default Tag;
