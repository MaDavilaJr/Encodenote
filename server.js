const express = require('express');

const path = require('path');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('./helpers/fsUtils');



const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((data) => {
        res.json(data)
      });
  });

  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
