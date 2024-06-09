// required modules
const path = require('path');
const router = require('express').Router();

// serves static HTML file on app startup
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// returns notes.html file on `/notes` route request
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;