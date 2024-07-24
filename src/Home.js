import React, { useState, useEffect } from "react";

const App = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://market-scraper-api.vercel.app/api/search?keywords=laptop');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lo mejor de Mercado Libre</h1>
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