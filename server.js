// require express modules and our routes
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// initialize express app and set port
const app = express();
const PORT = process.env.PORT || 3001;

// middleware:
// set up express app to handle data parsing and serving static files
// set up the app to use the routes we require
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// initialize the server and listen for requests
// console.log the port the server is listening on
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});