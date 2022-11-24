window.addEventListener('load'), async () => {
    /* nimen hakeminen /
    const nameInput = document.querySelector('#name');
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;
    / nimen tallennus /
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    const pokemonData = await haePokemonData();

    displayTodos(pokemonData);
});

async function haePokemonData() {
    // lisää url tähän
    const pokemonUrl = "";

    try {
        // tee fetch kutsu
        const pokemonPromise = "";
        // muuta jsoniksi
        const pokemonData = ""

        // palauta lista pokemoneja
        return {};
    } catch (error) {
        console.log(error);
        return [];
    }
};

function displayTodos(items) {
    // hae divi jonka sisään pokemonit tulee
    const pokeList = document.querySelector();

    pokeList.innerHTML = '';

    items.forEach(pokemon => {
        / 
        yksi pokemon näyttää esim tältä
        {
            name: "bulbasaur"
        }
        /
        const pokemonItem = document.createElement('div');
        pokemonItem.classList.add('todo-item');

        const content = document.createElement('div');
        content.classList.add('todo-content');

        content.innerHTML = `<div>
            <h4>${{/tähän pokemonin nimi*/}}</h4>
        </div>`;

        // lisää content pokemonitemin childiksi

        // lisää pokemonItem pokeListin childiksi

    })
};