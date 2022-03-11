const express = require('express');
const router = express.Router();
const alerte = require('../services/alertes'); //récupérer les functions

/* GET alertes */
router.get('/', async function(req, res, next) {
    try {
        res.json(await alerte.getAlertes(req.query.page));
    } catch (err) {
        console.error(`Error  `, err.message);
        next(err);
    }
});

router.get('/:id', async function(req, res,next){
    try {
        res.json(await alerte.getAlerteId(req.params.id));
    } catch (err) {
        console.error(`Erreur`,err.message);
        next(err);
    }
});

router.get('/niveaux/:id', async function(req, res,next){
    try {
        res.json(await alerte.getAlerteByNiveau(req.params.id));
    } catch (err) {
        console.error(`Erreur`,err.message);
        next(err);
    }
});

/* POST alerte  */
router.post('/', async function(req, res, next) {
    try {
        res.json(await alerte.create(req.body));
    } catch (err) {
        console.error(`Error while creating alerte `, err.message);
        next(err);
    }
});

/* PUT alerte  */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await alerte.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating alerte `, err.message);
        next(err);
    }
});

/* DELETE alerte  */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await alerte.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting alerte `, err.message);
        next(err);
    }
});

module.exports = router;