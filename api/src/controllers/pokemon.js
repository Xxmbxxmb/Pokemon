const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

const getPokemons = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      let request = await axios("https://pokeapi.co/api/v2/pokemon?limit=48");
      request = request.data.results;

      const resultado = [];

      for (let pokemon of request) {
        let r = await axios(pokemon.url);
        let new_poke = {};
        new_poke.id = r.data.id;
        new_poke.nombre = pokemon.name;
        new_poke.hp = r.data.stats[0].base_stat;
        new_poke.attack = r.data.stats[1].base_stat;
        new_poke.defense = r.data.stats[2].base_stat;
        new_poke.imagenStatic =
          r.data.sprites.other["dream_world"].front_default;
        new_poke.imagen =
          r.data.sprites.versions["generation-v"][
            "black-white"
          ].animated.front_default;
        new_poke.types = [];
        new_poke["base_exp"] = r.data.base_experience;

        for (let tipo of r.data.types) {
          new_poke["types"].push(tipo.type.name);
        }

        resultado.push(new_poke);
      }

      const allData = await Pokemon.findAll({
        include: [
          {
            model: Tipo,
            attributes: ["nombre"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      allData.map((p) => {
        let data = {};
        data.id = p.dataValues.id;
        data.nombre = p.dataValues.nombre;
        data.hp = p.dataValues.hp;
        data.attack = p.dataValues.attack;
        data.defense = p.dataValues.defense;
        data.speed = p.dataValues.speed;
        data.height = p.dataValues.height;
        data.weight = p.dataValues.weight;
        data.imagen = p.dataValues.imagen;
        data.types = [];
        p.dataValues.tipos.map((t) => data.types.push(t.dataValues.nombre));
        resultado.push(data);
      });

      return res.status(200).send(resultado);
    }

    let r = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon_detail = {};
    pokemon_detail.id = r.data.id;
    pokemon_detail.nombre = r.data.name;
    pokemon_detail.hp = r.data.stats[0].base_stat;
    pokemon_detail.attack = r.data.stats[1].base_stat;
    pokemon_detail.defense = r.data.stats[2].base_stat;
    pokemon_detail.speed = r.data.stats[5].base_stat;
    pokemon_detail.height = r.data.height;
    pokemon_detail.weight = r.data.weight;
    pokemon_detail.imagenStatic =
      r.data.sprites.other["dream_world"].front_default;
    pokemon_detail.imagen =
      r.data.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;
    pokemon_detail.types = [];

    for (let tipo of r.data.types) {
      pokemon_detail["types"].push(tipo.type.name);
    }

    return res.status(200).send(pokemon_detail);
  } catch (e) {
    console.log(e);
  }
};

const getPokemonById = async (req, res) => {
  const { idPokemon } = req.params;
  if (idPokemon.length < 8) {
    try {
      let r = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
      const pokemon_detail = {};
      pokemon_detail.id = r.data.id;
      pokemon_detail.nombre = r.data.name;
      pokemon_detail.hp = r.data.stats[0].base_stat;
      pokemon_detail.attack = r.data.stats[1].base_stat;
      pokemon_detail.defense = r.data.stats[2].base_stat;
      pokemon_detail.speed = r.data.stats[5].base_stat;
      pokemon_detail.height = r.data.height;
      pokemon_detail.weight = r.data.weight;
      pokemon_detail.imagenStatic =
        r.data.sprites.other["dream_world"].front_default;
      pokemon_detail.imagen =
        r.data.sprites.versions["generation-v"][
          "black-white"
        ].animated.front_default;
      pokemon_detail.types = [];
      pokemon_detail.abilities = [];

      for (let tipo of r.data.types) {
        pokemon_detail["types"].push(tipo.type.name);
      }

      for (let ability of r.data.abilities) {
        pokemon_detail["abilities"].push(ability.ability.name);
      }

      return res.status(200).send(pokemon_detail);
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      let r = await Pokemon.findByPk(idPokemon);
      r.dataValues.types = [];
      let tipos = await r.getTipos();
      tipos.map((t) => r.dataValues.types.push(t.dataValues.nombre));
      res.status(200).send(r.dataValues);
    } catch (e) {
      console.log(e);
    }
  }
};

const createPokemon = async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, imagen, types } =
    req.body;

  try {
    if (!name) return res.status(404).send("Faltan datos obligatorios");

    let new_poke = await Pokemon.create({
      nombre: name.toLowerCase(),
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      imagen: !imagen
        ? "https://www.thequiz.com/wordpress/wp-content/uploads/2017/12/Featured-Whos-That-Pokemon.jpg"
        : imagen,
    });

    for (let t of types) {
      let tip = await Tipo.findOne({
        where: { nombre: t },
      });

      await axios.put('https://pokemonpi-api-8xws-dev.fl0.io/transfer', {
        idPokemon: new_poke.id,
        idTipo: tip.dataValues.id,
      });
    }

    return res.status(200).send(new_poke);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getPokemons,
  getPokemonById,
  createPokemon,
};
