const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) => {
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
        new_poke.imagenStatic = r.data.sprites.other['dream_world'].front_default
        new_poke.imagen =
          r.data.sprites.versions["generation-v"][
            "black-white"
          ].animated.front_default;
        new_poke.types = [];

        for (let tipo of r.data.types) {
          new_poke["types"].push(tipo.type.name);
        }

        resultado.push(new_poke);
      }

      const allData = await Pokemon.findAll({
        include: [{
          model: Tipo,
          attributes: ['nombre'],
          through: {
            attributes: []
          }
        }]
      });

      allData.map(p => {
        let data = {}
        data.id = p.dataValues.id
        data.nombre = p.dataValues.nombre
        data.hp = p.dataValues.hp
        data.attack = p.dataValues.attack
        data.defense = p.dataValues.defense
        data.speed = p.dataValues.speed
        data.height = p.dataValues.height
        data.weight = p.dataValues.weight
        data.imagen = p.dataValues.imagen
        data.types = []
        p.dataValues.tipos.map(t => data.types.push(t.dataValues.nombre))
        resultado.push(data)
        // console.log(data)
      })



      // const base_datos = await Pokemon.findAll();
      // if (base_datos.length > 0) {
      //   base_datos.map((p) => {
      //     console.log(p.dataValues)
      //     resultado.push(p.dataValues);
      //   });
      // }

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
    pokemon_detail.imagenStatic = r.data.sprites.other['dream_world'].front_default
    pokemon_detail.imagen = r.data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    pokemon_detail.types = [];

    for (let tipo of r.data.types) {
      pokemon_detail["types"].push(tipo.type.name);
    }

    return res.status(200).send(pokemon_detail);
  } catch (e) {
    console.log(e);
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
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
      pokemon_detail.imagenStatic = r.data.sprites.other['dream_world'].front_default
      pokemon_detail.imagen =
        r.data.sprites.versions["generation-v"][
          "black-white"
        ].animated.front_default;
      pokemon_detail.types = [];
      pokemon_detail.abilities = [];

      for (let tipo of r.data.types) {
        pokemon_detail["types"].push(tipo.type.name);
      }

      for(let ability of r.data.abilities){
        pokemon_detail["abilities"].push(ability.ability.name)
      }

      return res.status(200).send(pokemon_detail);
    } catch (e) {
      console.log(e);
    }
  } else {
    try{
      let r = await Pokemon.findByPk(idPokemon)
      res.status(200).send(r)

    } catch(e){
      console.log(e)
    }
  }
});

router.put('/transfer', async (req, res) => {
  const { idPokemon, idTipo } = req.body;
  const pokemon = await Pokemon.findByPk(idPokemon);
  res.json(await pokemon.addTipo(idTipo));
});

router.post("/pokemons", async (req, res) => {
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
      types: types.slice(0,2),
      imagen: !imagen ? 'https://www.thequiz.com/wordpress/wp-content/uploads/2017/12/Featured-Whos-That-Pokemon.jpg' : imagen,
    });


    for(let t of new_poke.types){
      let tip = await Tipo.findOne({
        where: {nombre: t}
      })

      await axios.put('https://pi-poke.herokuapp.com/transfer', {
        idPokemon: new_poke.id,
        idTipo: tip.dataValues.id
      })
    }


    return res.status(200).send(new_poke);
  } catch (e) {
    console.log(e);
  }
});

router.get("/types", async (req, res) => {
  const { tipo } = req.query
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
      return res.status(200).send((tipos));
    }

    return res.status(200).send(db_type);
  } catch (e) {
    console.log(e);
  }
});


router.get('/testeo', async (req, res) => {
  const { tipo } = req.body
  let tip = await Tipo.findAll({
    where: {nombre : 'ghost'}
  })

  return res.status(200).send(tip)
})


router.use('/error', (req, res, next) => {
  let error = new Error(), 
  locals = {
    title: 'Error 404',
    description: 'Recurso no encontrado',
    error: error
  }

  error.status = 404
  res.status(404).send('error', locals)
  next()
})

module.exports = router;
