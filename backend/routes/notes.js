const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, query, validationResult } = require("express-validator");

// GET NOTES ENDPOINT
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// ADD NOTES ENDPOINT
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "Enter a description of 5 characters minimum."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// UPDATE NOTE ENDPOINT
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
   }
   let note= await Note.findById(req.params.id);
   if(!note){return res.status(404).send('Note not found.')}
   if(note.user.toString() !== req.user.id){
    return res.status(401).send('Not allowed')
   }
   note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
   res.json({note})
    
  } 
  catch (error) {
    console.error(error.message);
      res.status(500).send("Some error occured");
  }
});

//DELETE NOTE ENDPOINT
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
      // Find the note by ID
      const note = await Note.findById(req.params.id);
  
      // Check if the note exists
      if (!note) {
        return res.status(404).send("Note not found.");
      }
  
      // Check if the user has permission to delete the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed.");
      }
  
      // Delete the note
      await note.deleteOne();
  
      res.json({ message: "Note deleted successfully." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred.");
    }
  });

module.exports = router;
