const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8082;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));


// Obtener todas las reseñas
app.get('/reviews/api', async (req, res) => {
    try {
        const snapshot = await db.collection('reviews').get();
        const reviews = await Promise.all(snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const movieId = data.movieId; 

            // movieId no sea vacío
            if (!movieId) {
                return { id: doc.id, ...data, movieTitle: 'Desconocido' };
            }

            try {
                // Obtener el título de la película utilizando el movieId
                const movieSnapshot = await db.collection('movies').doc(movieId).get();
                const movieData = movieSnapshot.exists ? movieSnapshot.data() : { title: 'Desconocido' }; 
                return { id: doc.id, ...data, movieTitle: movieData.title }; 
            } catch (error) {
                console.error('Error al obtener la película:', error);
                return { id: doc.id, ...data, movieTitle: 'Error al obtener título' }; 
            }
        }));
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        res.status(500).json({ error: 'Error al obtener las reseñas: ' + error.message }); 
    }
});



// Agregar una nueva reseña
app.post('/reviews', async (req, res) => {
    const { author, movieId, content, rating } = req.body;

    try {
        const newReview = {
            author: author,
            movieId,
            content: content,
            rating: parseInt(rating, 10),
        };

        const response = await axios.post(`https://microserviciosejemplo-6zp6.onrender.com/reviews/api`, newReview);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error al agregar la reseña:', error.message);
        res.status(500).json({ error: 'Error al agregar la reseña: ' + error.message });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '/reviews.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor de reseñas escuchando en http://localhost:${port}`);
});
