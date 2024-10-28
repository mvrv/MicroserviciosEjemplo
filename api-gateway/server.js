const express = require('express');
const app = express();
const port = 9001;

app.get('/gateway', (req, res) => {
    res.send('API Gateway funcionando');
});

// Rutas para los microservicios
app.get('/', (req, res) => {
    res.redirect('http://localhost:8080/');
});

app.get('/movies', (req, res) => {
    res.redirect('http://localhost:8081/movies');
});

app.get('/reviews', (req, res) => {
    res.redirect('http://localhost:8082/reviews');
});

app.listen(port, () => {
    console.log("API Gateway escuchando en el puerto" + port);
});
