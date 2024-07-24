import React, { useState, useEffect } from "react";

const App = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [debugMessages, setDebugMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDebugMessages(prevMessages => [...prevMessages, 'Iniciando solicitud al servidor proxy...']);
        const response = await fetch('/api/search?q=computadora');
        setDebugMessages(prevMessages => [...prevMessages, `Estado de la respuesta: ${response.status}`]);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDebugMessages(prevMessages => [...prevMessages, `Datos recibidos del servidor proxy: ${JSON.stringify(data, null, 2)}`]);
        setSearchResults(data);
      } catch (err) {
        setDebugMessages(prevMessages => [...prevMessages, `Error al obtener datos del servidor proxy: ${err.message}`]);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lo mejor de Mercado Libre</h1>
      <div>
        {debugMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {searchResults ? (
        <div>
          <pre>{JSON.stringify(searchResults, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <p>Cargando datos...</p>
        </div>
      )}
    </div>
  );
};

export default App;