const express = require('express');
const app = express();
const port = process.env.PORT || 9001;

app.get('/gateway', (req, res) => {
    res.send('API Gateway funcionando');
});

// Rutas para los microservicios
app.get('/', (req, res) => {
    res.redirect('https://home-yrrj.onrender.com'); 
});

app.get('/movies', (req, res) => {
    res.redirect('https://microserviciosejemplo.onrender.com'); 
});

app.get('/reviews', (req, res) => {
    res.redirect('https://tu-dominio-de-render.com/reviews');
});

app.listen(port, () => {
    console.log("API Gateway escuchando en el puerto " + port);
});
