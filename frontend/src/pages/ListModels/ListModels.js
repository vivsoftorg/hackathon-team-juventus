import React, { useState, useEffect } from 'react';
import './ListModels.css';

const ListModels = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/tags`);
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      } else {
        throw new Error('Failed to fetch models');
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  return (
    <div className="list-models-container">
      <h1>List Models</h1>
      <ul>
        {models.map((model, index) => (
          <li key={index}>{model.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListModels;
