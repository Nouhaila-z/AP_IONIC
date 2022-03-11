const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const pensionnaire = require("../services/pensionnaires"); //récupérer les functions

/* GET pensionnaires */
router.get("/", async function (req, res, next) {
  try {
    res.json(await pensionnaire.getPensionnaires(req.query.page));
  } catch (err) {
    console.error(`Error  `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await pensionnaire.getPensionnaireId(req.params.id));
  } catch (err) {
    console.error(`Erreur`, err.message);
    next(err);
  }
});

router.get("/animaux/:id", async function (req, res, next) {
  try {
    res.json(await pensionnaire.getPensionnairesByAnimaux(req.params.id));
  } catch (err) {
    console.error(`Erreur`, err.message);
    next(err);
  }
});

router.get("/etats/:id", async function (req, res, next) {
  try {
    res.json(await pensionnaire.getPensionnairesByEtats(req.params.id));
  } catch (err) {
    console.error(`Erreur`, err.message);
    next(err);
  }
});

/* POST pensionnaire  */
router.post("/", async function (req, res, next) {
  try {
    res.json(await pensionnaire.create(req.body));
  } catch (err) {
    console.error(`Error while creating pensionnaire `, err.message);
    next(err);
  }
});

/* PUT pensionnaire  */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await pensionnaire.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating pensionnaire `, err.message);
    next(err);
  }
});

/* DELETE pensionnaire  */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await pensionnaire.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting pensionnaire `, err.message);
    next(err);
  }
});

module.exports = router;
