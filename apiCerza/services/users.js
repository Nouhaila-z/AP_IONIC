const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const bcrypt = require('bcryptjs');

//afficher toutes les infos par pages
async function getUsers(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * from users LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

//afficher un user par id
async function getUserId(id) {
  const rows = await db.query(
    `SELECT *
        FROM users
      WHERE users_id=?`,
    [id]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}



//créer un nouvel user
async function create(user) {
  const hashed= await bcrypt.hash(user.users_password, 12);
  const result = await db.query(
    `INSERT INTO users SET users_login=?, users_password=?, users_nom=?, users_prenom=?, users_roles_id=?`,
    [user.users_login, hashed, user.users_nom, user.users_prenom, user.users_roles_id]
  );

  let message = "user créer";

  return { message };
}

//mets à jour un user
async function update(id, user) {
  const result = await db.query(
    `UPDATE users
      SET users_login = ?, users_password = ?, users_prenom = ?, users_roles_id = ?
      WHERE users_id=?`,
    [user.users_login, user.users_password, user.users_nom, user.users_prenom, user.users_roles_id, id]
  );

  let message = "Erreur dans la mise à jour ";

  if (result.affectedRows) {
    message = "User mise à jour";
  }

  return { message };
}

//supprime un user
async function remove(id) {
  const result = await db.query(`DELETE FROM users WHERE users_id=?`, [id]);

  let message = "Erreur dans la suppression";

  if (result.affectedRows) {
    message = "User supprimé";
  }

  return { message };
}

module.exports = {
  getUsers,
  getUserId,
  create,
  update,
  remove,
};
