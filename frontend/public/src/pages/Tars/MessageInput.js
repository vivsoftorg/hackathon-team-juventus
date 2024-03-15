import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import './MessageInput.css'

const MessageInput = ({ sendMessage }) => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (text.trim() !== '') {
      try {
        const data = await sendMessage(text);
        setResponse(data.text);
        setError('');
      } catch (error) {
        setResponse('');
        setError('Error sending message');
      }
      setText('');
    }
  };

  const handleClearResponse = () => {
    setResponse('');
    setError('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'left', maxWidth: '50%' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <form onSubmit={handleSubmit}>
            <textarea
              value={text}
              onChange={handleChange}
              placeholder="Type your message..."
              rows={6}
              cols={50} 
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
        {(response || error) && (
          <div>
            <textarea rows="6" cols="50" value={`${response || error}`} readOnly />
            {(error && <Button onClick={handleClearResponse}>Clear</Button>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
