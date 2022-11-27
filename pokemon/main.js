window.addEventListener('load', async () => {
    const searchTerm = document.querySelector('#search');

    if (!searchTerm.value) {
        await searchPokemon("pikachu");
    }
    addEventListener('submit', async (event) => {
        event.preventDefault();
        await searchPokemon(searchTerm.value);
    });
});

async function searchPokemon(hakutermi) {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${hakutermi}`;
    try {
        // tee fetch kutsu
        const pokemonPromise = await fetch(pokemonUrl);
        // muuta jsoniksi
        const pokemonData = await pokemonPromise.json();
        console.log(pokemonData);

        const elementType = pokemonData.types.map(type => type.type.name);
        const imageLink = pokemonData.sprites.other.dream_world.front_default;
        const abilities = pokemonData.abilities.map(abilities => abilities.ability.name);

        // palauta tietyt kentät pokemonista
        const data = {
            image:imageLink, name:pokemonData.name, type:elementType, abilities:abilities
        };
        
        displayPokemons(data);
    } catch (error) {
        console.log(error);
        return [];
    }
}

function displayPokemons(data) {
    // hae divi jonka sisään pokemonit tulee
    const pokeList = document.querySelector("#pokemon-result");

    pokeList.innerHTML = '';

    const pokemonItem = document.createElement('div');
    const content = document.createElement('div');

    content.innerHTML = `
        <h4 id="pokemonNimi">${data.name}</h4> 
        <img id="kuva" src=${data.image}>
        <p id="pokemonTyyppi">Type: <br>${data.type}</p> 
        <p id="pokemonAbilities">Abilities: <br>${data.abilities}</p>
    `;

    // lisää content pokemonitemin childiksi
    pokemonItem.appendChild(content);
    
    // lisää pokemonItem pokeListin childiksi
    pokeList.appendChild(pokemonItem);
};