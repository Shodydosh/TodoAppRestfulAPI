const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
// get the express package into this file 

const app = express();

//! ROUTES

//This will tell Express to serve everything in the '/public' directory as static content.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const index = path.join(__dirname, '/public', 'index.html');
    res.sendFile(index);
});

app.listen(3000);
console.log('Server started at http://localhost:' + port);