// required modules
// Starter code hinted that I needed to find a way toi asign unique id's for each note
// I chose ShortUniqueId to accomplish this, as it is customizable
const fs = require('fs');
const util = require('util');
const ShortUniqueId = require('short-unique-id');

// Promisfy fs methods
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
// Variable to hold unique id's constructor and parameters
const uid = new ShortUniqueId({ length: 10});

// Helper class to hold methods to be exported
class Helpers {
  // Stored functions to not repeat myself, and ensure the right file is being read and written to
  read() {
    return readFile('db/db.json', 'utf8');
  };
  write(note) {
    return writeFile('db/db.json', JSON.stringify(note));
  };

  // method to get all notes from db.json file
  getNotes() {
    return this.read().then((notes) => {
      let returnedNotes
      
      try {
        returnedNotes = [].concat(JSON.parse(notes));
      } catch(err) {
        console.log(`No notes found in database. ${err}`);
        returnedNotes = [];
      }

      return returnedNotes;
    })
  };

  // Method to add a new note to the db.json file
  addNote(userInput) {
    const { title, text } = userInput;

    if (!title || !text) {
      throw new Error('Title and text are required');
    }

    const Note = { title, text, id: uid.rnd() };

    return this.getNotes().then((notes) => {
      notes.push(Note);
      return this.write(notes);
    });
  };

  // Method to delete a note from the db.json file
  deleteNote(id) {

    return this.getNotes()
      .then((notes) => 
        notes.filter((note) => note.id !== id))
          .then((filteredNotes) => 
            this.write(filteredNotes));
    };
}

// export the helper class
module.exports = new Helpers();