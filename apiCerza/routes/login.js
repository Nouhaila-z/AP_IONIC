const express = require("express");
const router = express.Router();
// const login = require("../services/login"); //récupérer les functions
const bcrypt = require('bcrypt');
const conn = require("../services/db")

/* GET users */
// login
router.post("/", async (req, res) => {
  const [row] = await conn.query(
    "SELECT * from users where users_login = ?",
    [req.body.login]
  );
  
  if (row.lenght === 0) {
    return res.status(422).json({
      message: "invalid login",
    });
  }
  
  const passwordIsValid = await bcrypt.compare(
    req.body.password,
    row.users_password,
  );
  console.log( await bcrypt.hash(req.body.password, 8))
  console.log(passwordIsValid,req.body.password, row.users_password)
  
  if (!passwordIsValid) {
    return res.status(401).json({
      message: "Invalid Password!",
    });
  }
  else {
    return res.status(200).send({
      id: row.users_id,
       login: row.users_login,
       nom: row.users_nom,
    })
  }
  
//   {
//   return res.status(200).send({
//     id: row.users_id,
//     login: row.users_login,
//     nom: row.users_nom,
//     password: passwordIsValid,
//   });
// }
});

module.exports = router;
