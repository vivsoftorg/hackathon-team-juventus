import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
