const express = require('express');
const router = express.Router();
const mission = require('../services/missions'); //récupérer les functions

/* GET missions */
router.get('/', async function(req, res, next) {
    try {
        res.json(await mission.getMissions(req.query.page));
    } catch (err) {
        console.error(`Error  `, err.message);
        next(err);
    }
});

router.get('/:id', async function(req, res,next){
    try {
        res.json(await mission.getMissionId(req.params.id));
    } catch (err) {
        console.error(`Erreur`,err.message);
        next(err);
    }
});

/* POST mission  */
router.post('/', async function(req, res, next) {
    try {
        res.json(await mission.create(req.body));
    } catch (err) {
        console.error(`Error while creating mission `, err.message);
        next(err);
    }
});

/* PUT mission  */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await mission.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating mission `, err.message);
        next(err);
    }
});

/* DELETE mission  */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await mission.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting mission `, err.message);
        next(err);
    }
});

module.exports = router;