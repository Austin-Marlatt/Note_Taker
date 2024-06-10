// Require modules 
const router = require('express').Router();
const Helpers = require('../db/helpers');

// retreives all notes on page load
router.get('/notes', (req, res) => {
  Helpers.getNotes()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// post route for adding a new note to the db
router.post('/notes', (req, res) => {
  Helpers.addNote(req.body)
    .then((note) => {
      res.status(200).json(note)
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// delete route for deleting a note from the db
router.delete('/notes/:id', (req, res) => {
  Helpers.deleteNote(req.params.id)
    .then(() => {
      res.json({ ok: true })})
    .catch((err) => {
      res.status(500).json(err)
    });
});

// export the router
module.exports = router;