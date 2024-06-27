import React, { useState } from 'react';
import axios from 'axios';
import TextParser from 'react-text-parser'; 
import Button from '../src/components/Button/Button';

function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Function to simulate typewriter effect
  const typewriterEffect = (text, index = 0) => {
    if (index < text.length) {
      // Add next character
      setResponseText(responseText => responseText + text.charAt(index));
      // Call the same function after some time for the next character
      setTimeout(() => typewriterEffect(text, index + 1), 50); // Adjust typing speed with timeout duration
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_API_URL, {
        "i_want": inputText
      });

      // Clear previous response and start typewriter effect
      setResponseText('');
      typewriterEffect(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseText(`Error: ${error.message}`);
    }
  };
  
  const handleSubmit = () => {
    fetchData();
    setResponseText(''); // Clear the input after sending
    
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Tars Bot</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text here"
        rows={5}
        cols={30} // Adjust the number of columns to reduce width
        style={{
          border: '1px solid #05A2C2',
          borderRadius: '8px',
          padding: '8px',
          fontSize: '16px',
          outline: 'none',
        }}
      />
      <br />
      <Button onClick={handleSubmit}>Send</Button>
      <br />
      <div
        style={{
          whiteSpace: 'pre-wrap',
          border: '1px solid #05A2C2',
          padding: '10px',
          margin: '10px 0',
          height: '100px',
          borderRadius: '4px',
          overflowWrap: 'break-word',
          overflow: 'auto',
          width: '50%',
        }}
        readOnly
        aria-label="Response"
      >
          <TextParser className="response-text" type="code">
          {responseText}
        </TextParser>
      </div>
    </div>
  );
}

export default App;