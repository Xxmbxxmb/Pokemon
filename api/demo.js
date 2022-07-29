const axios = require('axios')

async function asd(){
    let x = await axios.put('http://localhost:3001/transfer', {
        "idPokemon":"09f00a9a-f168-4419-8e1e-20bb73404441",
        "idTipo": 19
    })
    console.log(x)
}

asd()