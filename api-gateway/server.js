const express = require('express');
const fetch = require('node-fetch'); // Asegúrate de instalar axios o node-fetch
const app = express();
const port = process.env.PORT || 9001;

app.get('/gateway', (req, res) => {
    res.send('API Gateway funcionando');
});

// Ruta para las películas
app.get('/movies', async (req, res) => {
    try {
        const response = await fetch('https://microserviciosejemplo.onrender.com/movies');
        const movies = await response.json();
        res.json(movies); // Devuelve las películas al cliente
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ error: 'Error al obtener películas' });
    }
});

// Ruta para las reseñas
app.get('/reviews', async (req, res) => {
    try {
        const response = await fetch('https://microserviciosejemplo-6zp6.onrender.com/api/reviews');
        const reviews = await response.json();
        res.json(reviews); // Devuelve las reseñas al cliente
    } catch (error) {
        console.error('Error al obtener reseñas:', error);
        res.status(500).json({ error: 'Error al obtener reseñas' });
    }
});

app.listen(port, () => {
    console.log("API Gateway escuchando en el puerto " + port);
});
