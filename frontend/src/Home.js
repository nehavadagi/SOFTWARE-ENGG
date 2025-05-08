import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [results, setResults] = useState([]);
  const searchImages = async (query) => {
    const res = await axios.get(`https://api.openverse.org/v1/images?q=${query}`);
    setResults(res.data.results);
  };

  return (
    <div>
      <input onChange={(e) => searchImages(e.target.value)} placeholder="Search images" />
      <div>{results.map(img => <img src={img.thumbnail} alt="" key={img.id} />)}</div>
    </div>
  );
}

export default Home;
