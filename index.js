const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; //puerto

// Configuración de EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const routes = require('./routes/index');
app.use('/', routes);

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor frontend iniciado en http://localhost:${port}`);
});
