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
app.get('/api/reviews', async (req, res) => {
    try {
        const response = await axios.get(`https://microserviciosejemplo-6zp6.onrender.com/api/reviews`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener las reseñas:', error.message);
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

        const response = await axios.post(`https://microserviciosejemplo-6zp6.onrender.com/api/reviews`, newReview);
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
