import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const ChatPage = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('send name', (username) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'name', text: username }]);
    });

    socket.on('send message', (chat) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'message', text: chat }]);
    });

    return () => {
      socket.off('send name');
      socket.off('send message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('send name', name);
      socket.emit('send message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <form className="flex flex-col justify-center items-center mt-5" onSubmit={handleSubmit}>
        <input
          className="border border-gray-400 rounded-md mt-5 p-1"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-400 rounded-md mt-5 p-1"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-500 rounded-md p-2 text-white mt-5" type="submit">
          Send
        </button>
      </form>
      <div className="flex flex-col justify-center items-center mt-5" id="messageArea">
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              backgroundColor: msg.type === 'name' ? 'grey' : 'transparent',
              width: '100%',
              textAlign: 'center',
              color: msg.type === 'name' ? 'white' : 'black',
            }}
          >
            {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
