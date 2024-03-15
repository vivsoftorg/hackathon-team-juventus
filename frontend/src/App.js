import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListModels from './pages/ListModels/ListModels';
import Tars from './pages/Tars/Tars';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/list-models">List Models</Link></li>
      <li><Link to="/tars">Tars</Link></li>
    </ul>
  </nav>
);

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/list-models" element={<ListModels />} />
      <Route path="/tars" element={<Tars />} />
    </Routes>
  </Router>
);

export default App;
