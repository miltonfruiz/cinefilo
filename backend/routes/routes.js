// Importaciones necesarias
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/biblioteca', { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema de la película
const peliculaSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    anio: Number
});

// Modelo de la película
const Pelicula = mongoose.model('Pelicula', peliculaSchema);

// Esquema del usuario
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String
});

// Modelo del usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Función para generar token
const generarToken = (usuario) => {
    return jwt.sign({ id: usuario._id, nombre: usuario.nombre }, 'secretkey', { expiresIn: '1h' });
};

// Función para verificar token
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Acceso denegado. No se proporcionó un token.');

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.usuario = decoded;
        next();
    } catch (ex) {
        return res.status(400).send('Token inválido.');
    }
};

// Inicialización del servidor Express
const app = express();
app.use(express.json());

// Ruta para registrar un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    const usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    await usuario.save();
    res.send({ token: generarToken(usuario) });
});

// Ruta para iniciar sesión
app.post('/api/usuarios/iniciar-sesion', async (req, res) => {
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (!usuario) return res.status(400).send('Usuario no encontrado.');

    const isValidPassword = bcrypt.compareSync(req.body.password, usuario.password);
    if (!isValidPassword) return res.status(400).send('Contraseña incorrecta.');

    res.send({ token: generarToken(usuario) });
});

// Ruta protegida para obtener todas las películas
app.get('/api/peliculas', verificarToken, async (req, res) => {
    const peliculas = await Pelicula.find();
    res.send(peliculas);
});

// Ruta protegida para obtener una película por ID
app.get('/api/peliculas/:id', verificarToken, async (req, res) => {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) return res.status(404).send('Película no encontrada.');
    res.send(pelicula);
});

// Ruta protegida para crear una nueva película
app.post('/api/peliculas', verificarToken, async (req, res) => {
    const pelicula = new Pelicula({
        titulo: req.body.titulo,
        genero: req.body.genero,
        anio: req.body.anio
    });
    await pelicula.save();
    res.send(pelicula);
});

// Ruta protegida para actualizar una película
app.put('/api/peliculas/:id', verificarToken, async (req, res) => {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) return res.status(404).send('Película no encontrada.');
    pelicula.titulo = req.body.titulo;
    pelicula.genero = req.body.genero;
    pelicula.anio = req.body.anio;
    await pelicula.save();
    res.send(pelicula);
});

// Ruta protegida para eliminar una película
app.delete('/api/peliculas/:id', verificarToken, async (req, res) => {
    const pelicula = await Pelicula.findByIdAndRemove(req.params.id);
    if (!pelicula) return res.status(404).send('Película no encontrada.');
    res.send(pelicula);
});

// Inicio del servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});