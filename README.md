# Biblioteca de Películas
==========================

## Descripción
La Biblioteca de Películas es una aplicación web que permite a los usuarios almacenar y gestionar información sobre películas. La aplicación ofrece una API RESTful para interactuar con la base de datos de películas.

## Stack Tecnológico
* **Backend:** Node.js con Express.js
* **Base de Datos:** MongoDB
* **Autenticación:** JWT (JSON Web Tokens)
* **Seguridad:** SSL/TLS con certificado autofirmado

## Instalación
Para instalar la aplicación, sigue los siguientes pasos:

1. Clona el repositorio: `git clone https://github.com/usuario/biblioteca-peliculas.git`
2. Instala las dependencias: `npm install`
3. Configura la base de datos: `cp .env.example .env` y edita el archivo `.env` con tus credenciales de MongoDB
4. Inicia la aplicación: `npm start`

## Docker
La aplicación se puede ejecutar en un contenedor Docker. Para hacerlo, sigue los siguientes pasos:

1. Crea una imagen Docker: `docker build -t biblioteca-peliculas .`
2. Inicia el contenedor: `docker run -p 3000:3000 biblioteca-peliculas`
3. Accede a la aplicación: `http://localhost:3000`

## Endpoints
La aplicación ofrece los siguientes endpoints:

### Películas
* **GET /peliculas**: Obtiene una lista de todas las películas
* **GET /peliculas/:id**: Obtiene una película por ID
* **POST /peliculas**: Crea una nueva película
* **PUT /peliculas/:id**: Actualiza una película existente
* **DELETE /peliculas/:id**: Elimina una película

### Autenticación
* **POST /auth/login**: Inicia sesión y devuelve un token JWT
* **POST /auth/register**: Registra un nuevo usuario

## Seguridad
La aplicación utiliza SSL/TLS con certificado autofirmado para proteger la comunicación entre el cliente y el servidor. Los tokens JWT se utilizan para autenticar a los usuarios y autorizar el acceso a los endpoints.

## Contribuir
La contribución es bienvenida. Por favor, crea un fork del repositorio y envía un pull request con tus cambios. Asegúrate de seguir las mejores prácticas de codificación y pruebas.