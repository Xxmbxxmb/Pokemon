const { Router } = require("express");
const { Pokemon, Tipo } = require("../db");
const pokemonRouter = require("./pokemons")
const typeRouter = require("./types")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/types", typeRouter)
router.use("/pokemons", pokemonRouter)

router.put("/transfer", async (req, res) => {
  const { idPokemon, idTipo } = req.body;
  const pokemon = await Pokemon.findByPk(idPokemon);
  res.json(await pokemon.addTipo(idTipo));
});

router.use("/error", (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: "Recurso no encontrado",
      error: error,
    };

  error.status = 404;
  res.status(404).send("error", locals);
  next();
});

module.exports = router;
