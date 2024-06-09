const fs = require('fs');
const ShortUniqueId = require('short-unique-id');

const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

const uid = new ShortUniqueId({ length: 10});
const uuid = uid.rnd();

class Helpers {
  read() {
    return readFile('./db.json', 'utf8');
  };
  
  write(note) {
    return writeFile('./db.json', JSON.stringify(note), 'utf8');
  };


  getNotes() {
    return this.read().then((notes) => {

      let returnedNotes
      
      try {
        returnedNotes = [].push(JSON.parse(notes));
      } catch(err) {
        console.log(`No notes found in database. ${err}`);
        returnedNotes = [];
      }
    })
  };

  addNote(note) {
    const { title, text } = userInput;

    if (!title ||!text) {
      throw new Error('Title and text are required');
    }

    const Note = { title, text, id: uuid };

    return this.getNotes().then((notes) => {
      notes.push(Note);
      return this.write(notes);
    });
  };

  removeNote(id) {

    return this.getNotes().then((notes) => {
      const filteredNotes = notes.filter((note) => note.id!== id);
      return this.write(filteredNotes);
    });
  }
}

module.exports = new Helpers();