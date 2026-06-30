// Clase para representar una película
class Pelicula {
  constructor(id, titulo, director, año) {
    this.id = id;
    this.titulo = titulo;
    this.director = director;
    this.año = año;
  }
}

// Clase para el controlador CRUD de películas
class BibliotecaPeliculas {
  constructor() {
    this.peliculas = [];
    this.id = 1;
  }

  // Crear una nueva película
  crearPelicula(titulo, director, año) {
    const nuevaPelicula = new Pelicula(this.id, titulo, director, año);
    this.peliculas.push(nuevaPelicula);
    this.id++;
    return nuevaPelicula;
  }

  // Leer todas las películas
  leerPeliculas() {
    return this.peliculas;
  }

  // Leer una película por id
  leerPelicula(id) {
    return this.peliculas.find((pelicula) => pelicula.id === id);
  }

  // Actualizar una película
  actualizarPelicula(id, titulo, director, año) {
    const indice = this.peliculas.findIndex((pelicula) => pelicula.id === id);
    if (indice !== -1) {
      this.peliculas[indice].titulo = titulo;
      this.peliculas[indice].director = director;
      this.peliculas[indice].año = año;
      return this.peliculas[indice];
    } else {
      return null;
    }
  }

  // Eliminar una película
  eliminarPelicula(id) {
    const indice = this.peliculas.findIndex((pelicula) => pelicula.id === id);
    if (indice !== -1) {
      this.peliculas.splice(indice, 1);
      return true;
    } else {
      return false;
    }
  }
}

// Ejemplo de uso
const biblioteca = new BibliotecaPeliculas();
const pelicula1 = biblioteca.crearPelicula("El Padrino", "Francis Ford Coppola", 1972);
const pelicula2 = biblioteca.crearPelicula("El Señor de los Anillos", "Peter Jackson", 2001);

console.log(biblioteca.leerPeliculas());

const peliculaActualizada = biblioteca.actualizarPelicula(pelicula1.id, "El Padrino: Edición especial", "Francis Ford Coppola", 1972);
console.log(peliculaActualizada);

const eliminada = biblioteca.eliminarPelicula(pelicula2.id);
console.log(eliminada);
console.log(biblioteca.leerPeliculas());