const express = require('express');
const app = express();
const db = require('./firebaseconfig');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 8082; 

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'views')));

// Obtener todas las reseñas
app.get('/api/reviews', async (req, res) => {
    try {
        const snapshot = await db.collection('reviews').get();
        const reviews = await Promise.all(snapshot.docs.map(async (doc) => {
            const data = doc.data();
            const movieId = data.movieId; 

            // Verifica que movieId no sea vacío
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
app.post('/api/reviews', async (req, res) => {
    const { author, movieId, content, rating } = req.body;

    try {
        const newReview = {
            author: author,
            movieId,
            content: content,
            rating: parseInt(rating, 10), 
        };
        
        await db.collection('reviews').add(newReview);
        res.status(201).json({ message: 'Reseña agregada correctamente' });
    } catch (error) {
        console.error('Error al agregar la reseña:', error);
        res.status(500).json({ error: 'Error al agregar la reseña: ' + error.message });
    }
});

// (Opcional) Ruta para servir la página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '/reviews.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor de reseñas escuchando en http://localhost:${port}`);
});
