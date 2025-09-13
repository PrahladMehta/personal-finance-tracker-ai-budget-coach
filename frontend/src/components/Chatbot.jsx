import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Load previous messages from local storage if available
    const storedMessages = JSON.parse(localStorage.getItem('chatbotMessages')) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    // Save messages to local storage
    localStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);


  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages([...messages, { role: 'user', content: userInput }]);
    setUserInput('');

    try {
      const response = await axios.post('/api/chat', { message: userInput });
      const aiResponse = response.data.response;
      setMessages([...messages, { role: 'user', content: userInput }, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages([...messages, { role: 'assistant', content: 'An error occurred. Please try again later.' }]);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={handleUserInput} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;