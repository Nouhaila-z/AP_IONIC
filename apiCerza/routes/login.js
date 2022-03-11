const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const login = require("../services/login"); //récupérer les functions

/* GET users */
router.get("/", async function (req, res, next) {
    try {
      res.json(await login.connexion(req.body.login, req.body.password));
    } catch (err) {
      console.error(`Connexion refusé`, err.message);
      next(err);
    }
  });

module.exports = router;
