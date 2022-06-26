import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const Notestate = (props) => {
  const host = "http://localhost:5000/";
  const notesinit = [];
  const [notes, setNotes] = useState(notesinit);

  const addNote = async (title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}api/notes/addnotes`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth_token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

// Fetch all notes
  const getnotes = async () => {
    // API CALL
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth_token":
          localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    setNotes(json)
  };



  const deleteNote = async (id) => {
    // API call
    const response = await fetch(
      `${host}api/notes/deletenotes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth_token":
            localStorage.getItem('token'),
        },
      }
    );
    const json = await response.json()
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
    
  };




  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(
      `${host}api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth_token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = await response.json(); 
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote , getnotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default Notestate;
