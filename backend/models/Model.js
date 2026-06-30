const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  director: { type: String, required: true },
  estreno: { type: Date, required: true },
  genero: { type: String, required: true },
  sinopsis: { type: String }
});

const Pelicula = mongoose.model('Pelicula', peliculaSchema);

module.exports = Pelicula;