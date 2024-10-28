const express = require('express');
const app = express();
const db = require('./firebaseconfig');
const path = require('path');
const port = 8081;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

app.get('/movies/obtener', async (req, res) => {
    try {
        const moviesSnapshot = await db.collection('movies').get();
        const movies = moviesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(movies);
    } catch (error) {
        res.status(500).send('Error al obtener las películas');
    }
});

app.post('/movies', async (req, res) => {
    const { title, genero, year, caratula } = req.body;

    if (!title || !genero || !year || !caratula) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        await db.collection('movies').add({ title, genero, year, caratula });
        res.status(201).send('Película añadida');
    } catch (error) {
        console.error('Error al añadir película:', error);
        res.status(500).send('Error al añadir película');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '/movies.html'));
});

app.listen(port, () => {
    console.log('Microservicio de Movies escuchando en localhost:' + port);
});
