import mongoose from "mongoose";
import Note from "../models/Note";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Note", Note);

class NoteService {
  async deleteNote(id) {
    let data = await _repository.findOneAndDelete({ _id: id });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }
  async editNote(body, id) {
    let data = await _repository.findOneAndUpdate({ _id: id }, body, {
      new: true
    });
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
    return data;
  }
  async createNote(body) {
    let data = await _repository.create(body);
    return data;
  }
  async getNotesByBugId(bug) {
    let data = await _repository.find({ bug: bug });
    return data;
  }
}

const noteService = new NoteService();
export default noteService;
