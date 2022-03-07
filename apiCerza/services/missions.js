const db = require("./db");
const helper = require("../helper");
const config = require("../config");

//afficher toutes les infos par pages
async function getMissions(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * from missions LIMIT ?,?`, [
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

//afficher une mission par id
async function getMissionId(id) {
  const rows = await db.query(
    `SELECT *
        FROM missions
      WHERE missions_id=?`,
    [id]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//créer une nouvelle mission
async function create(mission) {
  const result = await db.query(
    `INSERT INTO missions
        (missions_titre,missions_etat,missions_commentaire,missions_users_id,missions_enclos_id,missions_pensionnaires_id)
        VALUES
        (?,?,?,?,?,?)`,
    [mission.missions_titre,mission.missions_etat,mission.missions_commentaire,mission.missions_users_id,mission.missions_enclos_id,mission.missions_pensionnaires_id]
  );

  let message = "mission créer";

  return { message };
}

//mets à jour une mission
async function update(id, mission) {
  const result = await db.query(
    `UPDATE mission
      SET missions_titre = ?, missions_etat = ?, missions_commentaire = ?, missions_users_id = ?, missions_enclos_id = ?, missions_pensionnaires_id
      WHERE missions_id=?`,
    [mission.missions_titre,mission.missions_etat,mission.missions_commentaire,mission.missions_user_id,mission.missions_enclos_id,mission.missions_pensionnaires_id, id]
  );

  let message = "Erreur dans la mise à jour ";

  if (result.affectedRows) {
    message = "Mission mise à jour";
  }

  return { message };
}

//supprime une mission
async function remove(id) {
  const result = await db.query(`DELETE FROM missions WHERE missions_id=?`, [id]);

  let message = "Erreur dans la suppression";

  if (result.affectedRows) {
    message = "Mission supprimé";
  }

  return { message };
}

module.exports = {
  getMissions,
  getMissionId,
  create,
  update,
  remove,
};
