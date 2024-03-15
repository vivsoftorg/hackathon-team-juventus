import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListModals from './pages/ListModals/ListModals'; // Check this file path
import Tars from './pages/Tars/Tars'; // Check this file path

const models = [
  {
    "name": "codellama:7b-code",
    "model": "codellama:7b-code",
    "modified_at": "2024-02-28T20:28:41.118199944+05:30",
    "size": 3825910440,
    "digest": "fc84f39375bcfe7612f7636a681ebb13d54eb4466e6ea6da07b5d1c37b49994d",
    "details": {
      "parent_model": "",
      "format": "gguf",
      "family": "llama",
      "families": null,
      "parameter_size": "7B",
      "quantization_level": "Q4_0"
    }
  },
  {
    "name": "codellama:latest",
    "model": "codellama:latest",
    "modified_at": "2024-02-29T12:31:24.616126912+05:30",
    "size": 3825910662,
    "digest": "8fdf8f752f6e80de33e82f381aba784c025982752cd1ae9377add66449d2225f",
    "details": {
      "parent_model": "",
      "format": "gguf",
      "family": "llama",
      "families": null,
      "parameter_size": "7B",
      "quantization_level": "Q4_0"
    }
  },
  {
    "name": "james:latest",
    "model": "james:latest",
    "modified_at": "2024-02-28T20:37:40.517967502+05:30",
    "size": 3825910625,
    "digest": "0aad7da574d087f85d0cf8260f8e8a35a423d70e2f3ca89402367a14100327e2",
    "details": {
      "parent_model": "",
      "format": "gguf",
      "family": "llama",
      "families": [
        "llama"
      ],
      "parameter_size": "7B",
      "quantization_level": "Q4_0"
    }
  },
  {
    "name": "llama2:latest",
    "model": "llama2:latest",
    "modified_at": "2024-02-29T19:57:01.476143603+05:30",
    "size": 3826793677,
    "digest": "78e26419b4469263f75331927a00a0284ef6544c1975b826b15abdaef17bb962",
    "details": {
      "parent_model": "",
      "format": "gguf",
      "family": "llama",
      "families": [
        "llama"
      ],
      "parameter_size": "7B",
      "quantization_level": "Q4_0"
    }
  },
  {
    "name": "mistral:7b-instruct",
    "model": "mistral:7b-instruct",
    "modified_at": "2024-02-28T21:00:15.073362886+05:30",
    "size": 4109865159,
    "digest": "61e88e884507ba5e06c49b40e6226884b2a16e872382c2b44a42f2d119d804a5",
    "details": {
      "parent_model": "",
      "format": "gguf",
      "family": "llama",
      "families": [
        "llama"
      ],
      "parameter_size": "7B",
      "quantization_level": "Q4_0"
    }
  },
  {
    "name": "mistral:instruct",
    "model": "mistral:instruct",
    "modified_at": "2024-03-08T18:03:56.064316273+05:30",
    "size": 4109865159,
    "digest": "61e88e884507ba5e06c49b40e6226884b2a16e872382c2b44a42f2d119d804a5",
    "details": {
      "parent_model": "",
      "format": "gguf",
      "family": "llama",
      "families": [
        "llama"
      ],
      "parameter_size": "7B",
      "quantization_level": "Q4_0"
    }
  },
  {
    "name": "mistral:latest",
    "model": "mistral:latest",
    "modified_at": "2024-02-29T12:42:07.313686305+05:30",
    "size": 4109865159,
    "digest": "61e88e884507ba5e06c49b40e6226884b2a16e872382c2b44a42f2d119d804a5",
    "details": {
      "parent_model": "",
      "format": "gguf",
      "family": "llama",
      "families": [
        "llama"
      ],
      "parameter_size": "7B",
      "quantization_level": "Q4_0"
    }
  }
];

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/list-modals">List Modals</Link></li>
      <li><Link to="/tars">Tars</Link></li>
    </ul>
  </nav>
);

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/list-modals" element={<ListModals models={models} />} />
      <Route path="/tars" element={<Tars />} />
    </Routes>
  </Router>
);

export default App;
