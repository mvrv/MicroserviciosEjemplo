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
        const response = await axios.get('https://microserviciosejemplo.onrender.com/movies/obtener');
        console.log(response.data); 

        if (Array.isArray(response.data)) {
            const movies = response.data;
            populateMovieSelect(movies);
            displayReviews(); 
        } else {
            console.error('La respuesta no es un array:', response.data);
        }
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
        const response = await axios.get('https://microserviciosejemplo-6zp6.onrender.com/reviews/api'); 
        const reviews = response.data;

        console.log('Reseñas:', reviews);

        if (!Array.isArray(reviews)) {
            console.error('La respuesta no es un array:', reviews);
            return;
        }

        const filteredReviews = movieFilterValue ? reviews.filter(review => review.movieTitle === movieFilterValue) : reviews;

        if (!Array.isArray(filteredReviews)) {
            console.error('filteredReviews no es un array:', filteredReviews);
            return;
        }

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
        console.error('Error al obtener las reseñas:', error.message);
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
        const response = await axios.get('https://microserviciosejemplo-6zp6.onrender.com/api/reviews'); 
        const reviews = response.data;

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
        console.error('Error al obtener las reseñas:', error.response ? error.response.data : error.message);
    }
}

// Función para agregar una reseña
async function addReview(event) {
    event.preventDefault(); 
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
        const response = await axios.post('https://microserviciosejemplo-6zp6.onrender.com/api/reviews', {
            author,
            movieId,
            content,
            rating
        });

        const data = response.data; 
        console.log(data.message);
        closeModal(); 
        displayReviews(); 
    } catch (error) {
        console.error('Error al agregar la reseña:', error.response ? error.response.data : error.message);
    }
}
