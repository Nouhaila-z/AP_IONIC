const db = require("./db");
const helper = require("../helper");
const config = require("../config");

//afficher toutes les infos par pages
async function getPensionnaires(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * from pensionnaires LIMIT ?,?`, [
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

//on recupere les pensionnaires par animal
async function getPensionnairesByAnimaux(page = 1) {
  const rows = await db.query(
    `SELECT *
            FROM pensionnaires
          WHERE pensionnaires_animaux_id=?`,
    [id]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//recupere les pensionnaires par etats de santé
async function getPensionnairesByEtats(page = 1) {
  const rows = await db.query(
    `SELECT *
            FROM pensionnaires
          WHERE pensionnaires_etats_id=?`,
    [id]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//afficher une Pensionnaire par id
async function getPensionnaireId(id) {
  const rows = await db.query(
    `SELECT *
        FROM pensionnaires
      WHERE pensionnaires_id=?`,
    [id]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//créer une nouvelle pensionnaire
async function create(pensionnaire) {
  const result = await db.query(
    `INSERT INTO pensionnaires
        (pensionnaires_nom, pensionnaires_animaux_id,pensionnaires_etats_id,pensionnaires_enclos_id)
        VALUES
        (?,?,?,?)`,
    [
      pensionnaire.pensionnaires_nom,
      pensionnaire.pensionnaires_animaux_id,
      pensionnaire.pensionnaires_etats_id,
      pensionnaire.pensionnaires_enclos_id,
    ]
  );

  let message = "pensionnaire créer";

  return { message };
}

//mets à jour une mission
async function update(id, pensionnaire) {
  const result = await db.query(
    `UPDATE mission
      SET pensionnaire_nom = ?, pensionnaires_animaux_id = ?, pensionnaires_etats_id = ?, pensionnaires_enclos_id = ?, 
      WHERE pensionnaires_id=?`,
    [
      pensionnaire.pensionnaires_nom,
      pensionnaire.pensionnaires_animaux_id,
      pensionnaire.pensionnaires_etats_id,
      pensionnaire.pensionnaires_enclos_id,
      id,
    ]
  );

  let message = "Erreur dans la mise à jour ";

  if (result.affectedRows) {
    message = "Pensionnaire mise à jour";
  }

  return { message };
}

//supprime une pensionnaire
async function remove(id) {
  const result = await db.query(
    `DELETE FROM pensionnaires WHERE pensionnaires_id=?`,
    [id]
  );

  let message = "Erreur dans la suppression";

  if (result.affectedRows) {
    message = "Pensionnaire supprimé";
  }

  return { message };
}

module.exports = {
  getPensionnaires,
  getPensionnairesByAnimaux,
  getPensionnairesByEtats,
  getPensionnaireId,
  create,
  update,
  remove,
};
