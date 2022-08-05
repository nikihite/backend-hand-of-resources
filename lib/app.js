const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/gtas', require('./controllers/gtas'));
app.use('/planets', require('./controllers/planets'));
app.use('/shapes', require('./controllers/shapes'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
