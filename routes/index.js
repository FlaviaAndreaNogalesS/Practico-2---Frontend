const express = require('express');
const router = express.Router();
//axios para hacer peticiones HTTP al backend
const axios = require('axios');

// URL base del backend
const API_URL = 'http://localhost:3001/peliculas';

//lista de películas ordenadas por calificación
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        const peliculas = response.data;
        res.render('pages/index', {
            // Ordena las películas por calificación
            peliculas: peliculas.sort((a, b) => b.rating - a.rating)
        });
    } catch (error) {
        console.error('Error al obtener la lista de películas:', error);
        res.render('pages/index', { peliculas: [] });
    }
});

// Ruta para ver los detalles de una película
router.get('/peliculas/:id', async (req, res) => {
    const peliculaId = req.params.id;
    try {
        // Petición al backend para obtener detalles
        const response = await axios.get(`${API_URL}/${peliculaId}`);
        const pelicula = response.data;  // Obtiene los datos de la película
        res.render('pages/movie', { pelicula }); // Renderiza la vista 
    } catch (error) {
        console.error('Error al obtener los detalles de la película:', error);
        res.render('pages/movie', { pelicula: null });
    }
});

// Ruta para ver películas de un actor
router.get('/actor/:actorId', async (req, res) => {
    const actorId = req.params.actorId; // Obtiene el Id
    try {  // Petición
        const response = await axios.get(`${API_URL}/actor/${actorId}`);
        const peliculas = response.data; // Obtiene las pelis
        const actorName = peliculas.length > 0 ? peliculas[0].actores.find(actor => actor.id == actorId).name : 'Actor Desconocido';
        res.render('pages/actor', { peliculas, actorName });
    } catch (error) {
        console.error('Error al obtener películas del actor:', error);
        res.render('pages/actor', { peliculas: [], actorName: 'Actor Desconocido' });
    }
});

// Ruta para ver películas de un director
router.get('/director/:directorId', async (req, res) => {
    const directorId = req.params.directorId;
    try {
        const response = await axios.get(`${API_URL}/director/${directorId}`);
        const peliculas = response.data;
        const directorName = peliculas.length > 0 ? peliculas[0].director.name : 'Director Desconocido';
        res.render('pages/director', { peliculas, directorName });
    } catch (error) {
        console.error('Error al obtener películas del director:', error);
        res.render('pages/director', { peliculas: [], directorName: 'Director Desconocido' });
    }
});

module.exports = router;
