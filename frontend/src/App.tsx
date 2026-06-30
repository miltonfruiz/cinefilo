import React, { useState, useEffect } from 'react';

interface Pelicula {
  id: number;
  titulo: string;
  año: number;
}

const App: React.FC = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPeliculas = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/peliculas');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Pelicula[] = await response.json();
      setPeliculas(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeliculas();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Peliculas</h1>
      <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id}>
            {pelicula.titulo} ({pelicula.año})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;