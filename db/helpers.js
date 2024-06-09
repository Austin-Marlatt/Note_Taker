const fs = require('fs');
const util = require('util');
const ShortUniqueId = require('short-unique-id');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const uid = new ShortUniqueId({ length: 10});

class Helpers {
  read() {
    return readFile('db/db.json', 'utf8');
  };
  
  write(note) {
    return writeFile('db/db.json', JSON.stringify(note));
  };

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

  deleteNote(id) {

    return this.getNotes()
      .then((notes) => 
        notes.filter((note) => note.id !== id))
          .then((filteredNotes) => 
            this.write(filteredNotes));
    };
}


module.exports = new Helpers();