import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

 
const NoteState = (props) => {
  const notesInitial =[
    {
      "_id": "657c821c69f544ff1a0707c0",
      "user": "657c7a976f4ed7a4477f03fe",
      "title": "My Title",
      "description": "Please wake up bro",
      "tag": "personal",
      "date": "1702658588247",
      "__v": 0
    }
  ]
  const [notes,setNotes]= useState(notesInitial)

  return <NoteContext.Provider value={{notes,setNotes}}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
