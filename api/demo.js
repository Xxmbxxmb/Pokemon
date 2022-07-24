const axios = require('axios')

async function asd(){
    let x = await axios('https://pokeapi.co/api/v2/pokemon/')
    console.log(x)
}

asd()