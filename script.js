document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('pokemonInput');
    const boton = document.getElementById('buscarBtn');

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            buscarPokemon(input.value.trim().toLowerCase());
        }
    });

    boton.addEventListener('click', () => {
        buscarPokemon(input.value.trim().toLowerCase());
    });
});

function buscarPokemon(nombre) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;
    const contenedor = document.getElementById('resultado');
    contenedor.innerHTML = '';

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Pokémon no encontrado');
            return res.json();
        })
        .then(data => {
            const tipos = data.types.map(t => t.type.name).join(', ');
            const imagen = data.sprites.front_default;
            const habilidades = data.abilities.map(a => a.ability.name).join(', ');
            const altura = (data.height / 10).toFixed(1); 
            const peso = (data.weight / 10).toFixed(1);  

            // Extraemos estadísticas base
            const stats = data.stats.map(stat => {
                return `<li><strong>${stat.stat.name.toUpperCase()}:</strong> ${stat.base_stat}</li>`;
            }).join('');

            contenedor.innerHTML = `
                <div class="pokemon-card">
                    <h2>${data.name.toUpperCase()} <span>#${data.id}</span></h2>
                    <img src="${imagen}" alt="${data.name}">
                    <p><strong>Tipo:</strong> ${tipos}</p>
                    <p><strong>Altura:</strong> ${altura} m</p>
                    <p><strong>Peso:</strong> ${peso} kg</p>
                    <p><strong>Habilidades:</strong> ${habilidades}</p>
                    <ul class="stats">
                        ${stats}
                    </ul>
                </div>
            `;
        })
        .catch(err => {
            contenedor.innerHTML = `<p class="error">${err.message}</p>`;
        });
}
