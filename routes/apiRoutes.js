const router = require('express').Router();
const Helpers = require('./helpers');

router.get('/notes', (req, res) => {
  Helpers.getNotes()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/notes', (req, res) => {
  Helpers.addNote(req.body)
    .then((note) => {
      res.status(200).json(note)
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/notes/:id', (req, res) => {
  Helpers.removeNote(req.params.id)
    .then(res.status(200).json({ message: 'Note deleted' }))
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;