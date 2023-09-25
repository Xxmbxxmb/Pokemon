const axios = require("axios")
const { Tipo } = require("../db");

const getTypes = async (req, res) => {
  const { tipo } = req.query;
  try {
    let db_type = await Tipo.findAll();
    if (Object.keys(db_type).length === 0) {
      let tipos = await axios("https://pokeapi.co/api/v2/type/");
      tipos = tipos.data.results.map((t) => t.name);

      tipos.map((t) => {
        Tipo.create({
          nombre: t,
        });
      });
      return res.status(200).send(tipos);
    }

    return res.status(200).send(db_type);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getTypes,
};
