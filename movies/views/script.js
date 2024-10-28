let currentIndex = 0;
let movies = [];

// Función para cargar las películas desde la base de datos
async function loadMovies() {
    const response = await fetch('/movies/obtener');
    movies = await response.json();
    displayMovies();
}

// Función para agregar película
async function addMovie(movie) {
    const response = await fetch('/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    });

    if (response.ok) {
        loadMovies();
    } else {
        alert('Error al agregar la película');
    }
}
document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = 'http://localhost:8080/';
    });

    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', closeModal);
});

// Función para obtener las películas
async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:8081/movies'); 
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
}

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

// Función para mostrar el modal
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.textContent = message; 
    modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; 
}

// Función para agregar una película
document.getElementById('addMovieForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const genero = document.getElementById('genero').value;
    const year = document.getElementById('year').value;
    const caratula = document.getElementById('caratula').value;

    try {
        const response = await fetch('http://localhost:8081/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, genero, year, caratula }),
        });

        if (response.ok) {
            showModal('Película agregada correctamente.'); 
            document.getElementById('addMovieForm').reset();
        } else {
            showModal('Error al agregar la película.'); 
        }
    } catch (error) {
        console.error('Error al agregar la película:', error);
        showModal('Error al agregar la película.');
    }
});
