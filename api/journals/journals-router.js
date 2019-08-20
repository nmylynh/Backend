const express = require('express');
const journalsDB = require('./journals-model')
const router = express.Router();

router.get('/', getJournals)
router.get('/:id', getJournalById);
router.post('/', addJournal);
router.put('/:id', updateJournal);
router.delete('/:id', deleteJournal);

async function getJournals(req, res){
    try {
        const journals = await journalsDB.find();

        res.status(200).json(journals);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}


async function getJournalById(req, res){
    try {
        const {id} = req.params;
        const journal = await journalsDB.findById(id);

        res.status(200).json(journal);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}

async function addJournal(req, res){
    try {
        const newJournal = await journalsDB.add(req.body);

        res.status(201).json(newJournal);
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}

async function updateJournal (req, res){
    try {
        const {id} = req.params;
        const updateJournal = await journalsDB.update(id, req.body);

        updateJournal
        ? res.status(200).json({ message: 'successfully updated journal' })
        : res.status(404).json({ message: 'journal not found'})
    } catch(err) {
        res.status(500).json({success: false, err});
    }
}

async function deleteJournal(req, res){
    try {
        const {id} = req.params;
        const success = await journalsDB.remove(id);

        success ?
         res.status(204).end() : res.status(404).end();
    }  catch(err) {
         res.status(500).json({success: false, err});
    }
}



module.exports = router;