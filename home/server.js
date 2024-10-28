const express = require('express');
const app = express();
const port = 8080;
const db = require('./firebaseconfig');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

// Ruta para obtener la cartelera de películas
app.get('/movies', async (req, res) => {
    try {
        const moviesSnapshot = await db.collection('movies').get();
        const movies = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(movies);
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '/home.html'));
});

app.listen(port, () => {
    console.log(`Microservicio de Home ejecutándose en http://localhost:${port}`);
});
