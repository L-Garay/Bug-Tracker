import mongoose from "mongoose";
import Bug from "../models/Bug";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Bug", Bug);

class BugService {
  async closeBug(id) {
    let data = await _repository.findByIdAndUpdate(
      { _id: id },
      { closed: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID", 400);
    }
  }
  async editBug(body, id) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, closed: false },
      body,
      {
        new: true
      }
    );
    return data;
  }

  async createBug(body) {
    let data = await _repository.create(body);
    return data;
  }
  async getBugById(id) {
    let data = await _repository.findById(id);
    if (!data) {
      throw new ApiError("Invalid ID Bug", 400);
    }
    return data;
  }
  async getAll() {
    return await _repository.find({});
  }
}

const bugService = new BugService();
export default bugService;
