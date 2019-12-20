import express from "express";

import noteService from "../services/NoteService";

export default class NoteController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .post("", this.createNote)
      .put("/:id", this.editNote)
      .delete("/:id", this.deleteNote);
  }
  async createNote(req, res, next) {
    try {
      let data = await noteService.createNote(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async editNote(req, res, next) {
    try {
      let data = await noteService.editNote(req.body, req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteNote(req, res, next) {
    try {
      let data = await noteService.deleteNote(req.params.id);
      return res.send("Note Deleted");
    } catch (error) {
      next(error);
    }
  }
}
