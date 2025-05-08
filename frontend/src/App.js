import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  const search = async () => {
    const res = await axios.get(`${apiUrl}/search?q=cat`);
    console.log(res.data);
  };

  return <button onClick={search}>Search</button>;
}

