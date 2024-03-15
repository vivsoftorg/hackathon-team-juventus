import React from 'react';
import './ListModals.css';

const ListModals = ({ models }) => {
  return (
    <div className="home-container">
      <h1>List Modals</h1>
      <div className="model-container">
        {models.map((model, index) => (
          <div key={index} className="model-box">
            <h2>{model.name}</h2>
            <p><strong>Model:</strong> {model.model}</p>
            <p><strong>Modified At:</strong> {model.modified_at}</p>
            <p><strong>Size:</strong> {model.size}</p>
            <p><strong>Digest:</strong> {model.digest}</p>
            <p><strong>Details:</strong></p>
            <ul>
              {Object.entries(model.details).map(([key, value], idx) => (
                <li key={idx}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListModals;
