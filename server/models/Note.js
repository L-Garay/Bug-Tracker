import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Note = new Schema(
  {
    content: { type: String, required: true },
    reportedBy: { type: String, required: true },
    flagged: { type: String, enum: ["pending", "completed", "rejected"] },
    bug: { type: ObjectId, ref: "Bug", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Note;
