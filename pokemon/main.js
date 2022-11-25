window.addEventListener('load', async () => {
    const pokemonData = await haePokemonData();
    const pokemonsWithMoreData = await getMoreData(pokemonData);

    displayPokemons(pokemonsWithMoreData);
});

/* haetaan data pokemon apista ja palautetaan lista pokemoneja */

async function haePokemonData() {
    // lisää url tähän
    const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";

    try {
        // tee fetch kutsu
        const pokemonPromise = await fetch(pokemonUrl);
        // muuta jsoniksi
        const pokemonData = await pokemonPromise.json();

        // palauta lista pokemoneja
        return pokemonData.results;
    } catch (error) {
        console.log(error);
        return [];
    }
};

async function getMoreData(pokemonData) {

    const fillInformation = await Promise.allSettled(pokemonData.map(async pokemon => {
        const pokemonUrl = pokemon.url;

        const pokemonPromise = await fetch(pokemonUrl);
        // muuta jsoniksi, pokemonData on tämä https://pokeapi.co/api/v2/pokemon/23/
        const pokemonData = await pokemonPromise.json();

        const elementType = pokemonData.types.map(type => type.type.name);

        const imageLink = pokemonData.sprites.other.dream_world.front_default;

        const abilities = pokemonData.abilities.map(abilities => abilities.ability.name);

        console.log(abilities);
        return {
            image:imageLink, name:pokemon.name, type:elementType, abilities:abilities
        };
    }))
    return fillInformation.map(data => data.value);
}

function displayPokemons(pokemonData) {
    // hae divi jonka sisään pokemonit tulee
    const pokeList = document.querySelector("#pokemon-result");

    pokeList.innerHTML = '';

    console.log(pokemonData);

    pokemonData.forEach(pokemon => {
    
        const pokemonItem = document.createElement('div');
        pokemonItem.classList.add('todo-item');

        const content = document.createElement('div');
        content.classList.add('todo-content');

        content.innerHTML =
        `<h4 id="pokemonNimi">${pokemon.name}</h4> <img id="kuva" src=${pokemon.image}>
        <p id="pokemonTyyppi">Type: <br>${pokemon.type}</p> <p id="pokemonAbilities">Abilities: <br>${pokemon.abilities}</p>`;

        // lisää content pokemonitemin childiksi

        pokemonItem.appendChild(content);
        
        // lisää pokemonItem pokeListin childiksi

        pokeList.appendChild(pokemonItem);
    })
};