const { Router } = require("express");
const { getPokemonById, createPokemon, getPokemons } = require("../controllers/pokemon");

const router = Router()

router.get("/", getPokemons);
router.get("/:idPokemon", getPokemonById);
router.post("/", createPokemon);

module.exports = router