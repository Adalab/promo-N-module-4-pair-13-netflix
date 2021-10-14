const express = require('express');
const cors = require('cors');

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

// este endpoint debe ir antes de los servidores estáticos sino no gestionará la petición pq la gestionarán los servidores estáticos
server.get('/movie/:movieId', (req, res) => {
  console.log(req.params.movieId);
});

// configuración del servidor de estáticos:
const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

// escribimos los endepoints que queramos

server.get('/movies', (req, res) => {
  const response = {
    success: true,
    movies: [
      {
        id: '1',
        title: 'Gambita de dama',
        gender: 'Drama',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '2',
        title: 'Friends',
        gender: 'Comedia',
        image: 'https://via.placeholder.com/150',
      },
    ],
  };
  res.json(response);
});
