const db = require("./db");
const helper = require("../helper");
const config = require("../config");

//afficher toutes les infos par pages
async function getAnimaux(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * from animaux LIMIT ?,?`, [
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
async function getAnimalId(id) {
  const rows = await db.query(
    `SELECT *
        FROM animaux
      WHERE animaux_id=?`,
    [id]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//afficher les animaux par régions
async function getAnimauxByRegion(region){
  const rows = await db.query(
    `SELECT *
    FROM animaux
    WHERE animaux_regions_id=?`,
    [region]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//afficher les animaux par alimentations
async function getAnimauxByAlimentation(alimentation){
  const rows = await db.query(
    `SELECT *
    FROM animaux
    WHERE animaux_alimentation_id=?`,
    [alimentation]
  );

  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//créer un nouvelle animal
async function create(animal) {
  const result = await db.query(
    `INSERT INTO animaux
        (animaux_libelle,animaux_poids,animaux_gestation,animaux_regions_id,animaux_alimentation_id)
        VALUES
        (?,?,?,?,?)`,
    [animal.animaux_libelle,animal.animaux_poids,animal.animaux_gestation,animal.animaux_regions_id,animal.animaux_alimentation_id]
  );

  let message = "Animal créer";

  return { message };
}

//mets à jour un animal
async function update(id, animal) {
  const result = await db.query(
    `UPDATE animaux
      SET animaux_libelle = ?, animaux_poids = ?, animaux_gestation = ?, animaux_region_id = ?, animaux_alimentation_id = ?
      WHERE animaux_id=?`,
    [animal.animaux_libelle,animal.animaux_poids,animal.animaux_gestation,animal.animaux_regions_id,animal._id, id]
  );

  let message = "Erreur dans la mise à jour ";

  if (result.affectedRows) {
    message = "Animal mise à jour";
  }

  return { message };
}

//supprime un animal
async function remove(id) {
  const result = await db.query(`DELETE FROM animaux WHERE animaux_id=?`, [id]);

  let message = "Erreur dans la suppression";

  if (result.affectedRows) {
    message = "Animal supprimé";
  }

  return { message };
}

module.exports = {
  getAnimaux,
  getAnimalId,
  getAnimauxByRegion,
  getAnimauxByAlimentation,
  create,
  update,
  remove,
};
