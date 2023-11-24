// Create web server

// Import express
const express = require('express');
// Import cors
const cors = require('cors');
// Import body-parser
const bodyParser = require('body-parser');
// Import mongoose
const mongoose = require('mongoose');
// Import path
const path = require('path');
// Import comments.js
const comments = require('./routes/api/comments');

// Create express server
const app = express();

// Middleware cors
app.use(cors());
// Middleware body-parser
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/comments', comments);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // Any route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// Set port
const port = process.env.PORT || 5000;

// Listen port
app.listen(port, () => console.log(`Server started on port ${port}`));