document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
});

// Función para obtener las películas
async function fetchMovies() {
    try {
        const response = await fetch('https://home-yrrj.onrender.com/movies');
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
}

    const addMovie = document.getElementById('add-movie');
    addMovie.addEventListener('click', () => {
        window.location.href = 'https://microserviciosejemplo.onrender.com';
    });

    const addReview = document.getElementById('add-review');
    addReview.addEventListener('click', () => {
        window.location.href = 'https://microserviciosejemplo-6zp6.onrender.com/api/reviews';
    });

// Función para mostrar las películas en la cuadrícula
function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = ''; 

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${movie.caratula}" alt="${movie.title}">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p>Género: ${movie.genero}</p>
                <p>Año: ${movie.year}</p>
            </div>
        `;
        movieContainer.appendChild(card);
    });
}

