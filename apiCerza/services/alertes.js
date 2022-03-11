const db = require("./db");
const helper = require("../helper");
const config = require("../config");

//afficher toutes les infos par pages
async function getAlertes(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * from alertes LIMIT ?,?`, [
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

//afficher un animal par id
async function getAlerteId(id) {
  const rows = await db.query(
    `SELECT *
        FROM alertes
      WHERE alertes_id=?`,
    [id]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//afficher un animal par id
async function getAlerteByNiveau(niveau) {
    const rows = await db.query(
      `SELECT *
          FROM alertes
        WHERE alertes_niveaux_id=?`,
      [niveau]
    );
  
    const data = helper.emptyOrRows(rows);
  
    return {
      data,
    };
  }


//créer un nouvelle alerte
async function create(alerte) {
  const result = await db.query(
    `INSERT INTO alertes
        (alertes_libelle,alertes_description,alertes_niveaux_id)
        VALUES
        (?,?,?)`,
    [alerte.alertes_libelle,alerte.alertes_description,alerte.alertes_niveaux_id]
  );

  let message = "Alerte créer";

  return { message };
}

//mets à jour une alerte
async function update(id, alerte) {
  const result = await db.query(
    `UPDATE alertes
      SET alertes_libelle = ?, alertes_description = ?, alertes_niveaux_id = ?
      WHERE alertes_id=?`,
    [alerte.alertes_libelle,alerte.alertes_description,alerte.alertes_niveaux_id, id]
  );

  let message = "Erreur dans la mise à jour ";

  if (result.affectedRows) {
    message = "Alerte mise à jour";
  }

  return { message };
}

//supprime une alerte
async function remove(id) {
  const result = await db.query(`DELETE FROM alertes WHERE alertes_id=?`, [id]);

  let message = "Erreur dans la suppression";

  if (result.affectedRows) {
    message = "Alerte supprimé";
  }

  return { message };
}

module.exports = {
  getAlertes,
  getAlerteId,
  getAlerteByNiveau,
  create,
  update,
  remove,
};
