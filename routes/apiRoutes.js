const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');
const router = require('express').Router();
const { v1: uuidv1 } = require('uuid');

router.get('/notes', (req, res) => {
    readFromFile('db/db.json')
    .then((data) => JSON.parse(data))
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err))
})

router.post('/notes', (req, res) => {
    const note = {title: req.body.title, text: req.body.text, id: uuidv1()};
    readAndAppend(note, 'db/db.json')
    readFromFile('db/db.json')
    .then((data) => JSON.parse(data))
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err))
})

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    readFromFile('db/db.json')
    .then((data) => JSON.parse(data))
    .then((notes) => {
        const filteredNotes = notes.filter((note) => note.id !== id)
        writeToFile('db/db.json', filteredNotes)
    })

    readFromFile('db/db.json')
    .then((data) => JSON.parse(data))
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err))
})

module.exports = router;