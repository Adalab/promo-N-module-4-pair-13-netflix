const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// const foundMovie = movies.find((movie) => {
//   if (movie.id === req.params.movieId) {
//     console.log(foundMovie);
//   }
// });

// configurar db: esta constante apunta a una conexión a la base de datos
const db = new Database('./src/db/database.db');

//nuevo endpoint para registrar nuevas usuarias
server.post('/login/:sign-up', (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const query = db.prepare('INSERT into users(email, pass) values(?, ?);');
  const userInsert = query.run(email, pass);
  res.json({ userId: userInsert.lastInsertRowid });

  console.log();
});

//preg 19.10 verificar punto 1 si está correcto y app

// este endpoint debe ir antes de los servidores estáticos sino no gestionará la petición pq la gestionarán los servidores estáticos
server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);
});

// configuración del servidor de estáticos:
const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

// escribimos los endepoints que queramos

server.get('/movies', (req, res) => {
  //Esta operación prepara una consulta a nuestra base de datos que selecciona todas las peliculas.
  const moviesQuery = db.prepare('SELECT * FROM movies');
  // Aquí se ejecuta la consulta de arriba y pide que todas las peliculas seleccionadas sean devueltas como array de objetos
  const movies = moviesQuery.all();
  //console.log(movies);
  const response = {
    success: true,
    movies: movies,
  };
  res.json(response);
});
