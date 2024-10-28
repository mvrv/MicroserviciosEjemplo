const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 9001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Ruta de prueba para verificar que el gateway funciona
app.get('/gateway', (req, res) => {
    res.send('API Gateway funcionando');
});

// Redirigir a la página principal
app.get('/', (req, res) => {
    res.redirect('https://home-yrrj.onrender.com');
});

// Redirigir a la API de películas
app.get('/movies', async (req, res) => {
    try {
        const response = await axios.get('https://microserviciosejemplo.onrender.com');
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ error: 'Error al obtener películas' });
    }
});

// Redirigir a la API de reseñas
app.get('/reviews', async (req, res) => {
    try {
        const response = await axios.get('https://microserviciosejemplo-6zp6.onrender.com/api/reviews');
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener reseñas:', error);
        res.status(500).json({ error: 'Error al obtener reseñas' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API Gateway escuchando en el puerto ${port}`);
});
