import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 9001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/gateway', (req, res) => {
    res.send('API Gateway funcionando');
});

app.get('/', (req, res) => {
    res.redirect('https://home-yrrj.onrender.com'); 
});

app.get('/movies', (req, res) => {
    res.redirect('https://microserviciosejemplo.onrender.com'); 
});

app.get('/reviews', (req, res) => {
    res.redirect('https://microserviciosejemplo-6zp6.onrender.com');
});

app.listen(port, () => {
    console.log("API Gateway escuchando en el puerto " + port);
});
