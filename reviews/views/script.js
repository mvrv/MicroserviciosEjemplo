document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    const addReviewButton = document.getElementById('addReviewButton');
    addReviewButton.addEventListener('click', openModal);

    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', closeModal);

    const movieFilter = document.getElementById('movieFilter');
    movieFilter.addEventListener('change', filterReviews);

    const reviewForm = document.getElementById('addReviewForm');
    reviewForm.addEventListener('submit', addReview);
});

// Función para obtener las películas
async function fetchMovies() {
    try {
        const response = await fetch('https://api-gateway-tv03.onrender.com/movies'); 
        const movies = await response.json();
        populateMovieSelect(movies);
        displayReviews(); 
    } catch (error) {
        console.error('Error al obtener las películas:', error);
    }
}

// Función para llenar el menú desplegable de películas
function populateMovieSelect(movies) {
    const movieFilter = document.getElementById('movieFilter');
    const movieSelect = document.getElementById('movieSelect');

    movies.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.id; 
        option.textContent = movie.title;
        movieFilter.appendChild(option.cloneNode(true));
        movieSelect.appendChild(option);
    });
}

// Función para mostrar las reseñas en la cuadrícula
async function displayReviews() {
    const movieFilterValue = document.getElementById('movieFilter').value;
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';

    try {
        const response = await fetch('ttps://microserviciosejemplo-6zp6.onrender.com/api/reviews'); 
        const reviews = await response.json();

        const filteredReviews = movieFilterValue ? reviews.filter(review => review.movieTitle === movieFilterValue) : reviews;

        filteredReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <h2>${review.movieTitle}</h2>
                <p><strong>${review.author}</strong></p>
                <p>${review.content}</p>
                <p>Calificación: ${'★'.repeat(review.rating)}</p>
            `;
            reviewContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
    }
}

// Función para abrir el modal
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block'; 
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Función para filtrar reseñas según la película seleccionada
async function filterReviews() {
    const movieFilterValue = document.getElementById('movieFilter').value; 
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = ''; 

    try {
        const response = await fetch('https://microserviciosejemplo-6zp6.onrender.com/api/reviews'); 
        const reviews = await response.json();

        // Filtrar reseñas basándose en el movieId
        const filteredReviews = movieFilterValue ? reviews.filter(review => review.movieId === movieFilterValue) : reviews;

        // Mostrar las reseñas filtradas
        filteredReviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <h2>${review.movieTitle}</h2>
                <p><strong>${review.author}</strong></p>
                <p>${review.content}</p>
                <p>Calificación: ${'★'.repeat(review.rating)}</p>
            `;
            reviewContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
    }
}

// Función para agregar una reseña
async function addReview(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    const author = document.getElementById('author').value;
    const movieId = document.getElementById('movieSelect').value;
    const content = document.getElementById('content').value;
    const rating = document.getElementById('rating').value;

    // Asegúrate de que todos los campos son válidos
    if (!author || !movieId || !content || !rating) {
        console.error('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('https://microserviciosejemplo-6zp6.onrender.com/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ author, movieId, content, rating }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        console.log(data.message);
        closeModal(); 
        displayReviews(); 
    } catch (error) {
        console.error('Error al agregar la reseña:', error.message);
    }
}
