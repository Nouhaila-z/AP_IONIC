const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const bcrypt = require("bcrypt");


async function connexion(login,password) {
    const rows = await db.query(
      `SELECT *
      FROM users
      where users_login = ?
      and users_password = ?`,
      [login,password]
    );
    const data = helper.emptyOrRows(rows);

    return {
      data,
    };
}


module.exports = {
  connexion,
};
