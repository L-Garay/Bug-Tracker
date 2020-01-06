import express from "express";
import bugService from "../services/BugService";
import noteService from "../services/NoteService";

export default class BugController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .get("/:id", this.getBugById)
      .get("/:id/notes", this.getNotesByBugId)
      .post("", this.createBug)
      .put("/:id", this.editBug)
      .delete("/:id", this.closeBug);
  }

  async getAll(req, res, next) {
    try {
      let data = await bugService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getBugById(req, res, netx) {
    try {
      let data = await bugService.getBugById(req.params.id);
      return res.send(data);
    } catch (error) {
      netx(error);
    }
  }
  async getNotesByBugId(req, res, next) {
    try {
      let data = await noteService.getNotesByBugId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async createBug(req, res, next) {
    try {
      let data = await bugService.createBug(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async editBug(req, res, next) {
    try {
      let data = await bugService.editBug(req.params.id, req.body.description);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async closeBug(req, res, next) {
    try {
      let data = await bugService.closeBug(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
