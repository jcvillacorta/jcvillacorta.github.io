const BASE_API = 'https://pokeapi.co/api/v2/'

async function getPokemon(id) {
    const response = await fetch(`${BASE_API}pokemon/${id}/`)
    return await response.json()
}

async function getSpecies(id) {
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
    return await response.json()
}

async function fetchPokemons(number) {
    for (let i=1; i <= number; i++) {
    await  getPokemon(i)
    await getSpecies(i)
    }
}

//fetchPokemons(1)

/*
async function fetchSpecies(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    const pokemondesc = await response.json()
    getSpecies(pokemondesc)
}

function getSpecies(pokemondesc) {
    descripcion = pokemondesc.flavor_text_entries[42].flavor_text
    const modaldescripcion = document.createElement("p")
    modaldescripcion.appendChild(descripcion)
}

// filtra todos los resultados con el lenguaje español
/*function getSpecies(pokemondesc) {
    let descripcion = []
    descripcion = pokemondesc.flavor_text_entries.find(entry => entry.language.name === "es").flavor_text
    for (let i=0; i < descripcion.length; i++) {
        console.log(descripcion[i])
        }
    
}

fetchSpecies(3)*/


//flavor_text_entries.find(entry => entry.language.name === lang).flavor_text

//flavor_text_entries[26].flavor_text + pokemondesc.flavor_text_entries[34].flavor_text + pokemondesc.flavor_text_entries[42].flavor_text