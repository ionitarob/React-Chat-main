// src/components/Chat.js

// Importa las bibliotecas necesarias
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import RoomList from './RoomList';
import { useUser } from '../UserContext';
import '../App.css';

// Componente funcional Chat
const Chat = () => {
  // Hooks de estado y contexto
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [room, setRoom] = useState('');
  const [quoteMessage, setQuoteMessage] = useState(null);
  const [showQuoteMenu, setShowQuoteMenu] = useState(false);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);
  const { user, setUser } = useUser();

  // Instancia de Firestore
  const firestore = firebase.firestore();

  // Efecto para cargar mensajes y suscribirse a cambios
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roomParam = queryParams.get('room');
    const userParam = queryParams.get('user') || user;

    setRoom(roomParam);
    setUser(userParam);

    const roomRef = firestore.collection('rooms').doc(roomParam);

    const unsubscribe = roomRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        setMessages(data.messages || []);
      }
    });

    return () => unsubscribe();
  }, [location.search, firestore, user, setUser]);

  // Función para enviar mensajes
  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const roomRef = firestore.collection('rooms').doc(room);
      const serverTimestamp = firebase.firestore.Timestamp.now();
      const newMessageObj = {
        message: newMessage,
        user,
        timestamp: serverTimestamp,
      };

      if (quoteMessage) {
        newMessageObj.quote = quoteMessage;
        setQuoteMessage(null);
        setSelectedMessageIndex(null);
      }

      await roomRef.update({
        messages: firebase.firestore.FieldValue.arrayUnion(newMessageObj),
      });

      setNewMessage('');
    }
  };

  // Función para responder citando un mensaje
  const handleQuoteReply = (message) => {
    setQuoteMessage(message);
    setShowQuoteMenu(false);
  };

  // Función para mostrar/ocultar el menú de citar
  const toggleQuoteMenu = (index) => {
    setShowQuoteMenu(!showQuoteMenu);
    setSelectedMessageIndex(index);
  };

  // Función para cambiar el nombre de usuario
  const handleChangeUsername = () => {
    const newUsername = prompt('Ingresa tu nuevo nombre de usuario:');
    if (newUsername) {
      setUser(newUsername);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('user', newUsername);
      window.history.replaceState({}, '', `${location.pathname}?${searchParams}`);
    }
  };

  // Función para crear una nueva sala
  const handleCreateRoom = () => {
    const newRoomName = prompt('Ingresa el nombre de la nueva sala:');
    if (newRoomName) {
      const newRoomRef = firestore.collection('rooms').doc(newRoomName);
      newRoomRef.set({ messages: [] });
      window.location.href = `/chat?room=${newRoomName}&user=${user}`;
    }
  };

  // Función para manejar la pulsación de tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Renderizado del componente Chat
  return (
    <div className="chat-container">
      <div className="header">
        <h1>
          Bienvenido a la sala de chat {room && `(${room})`} - Usuario: {user}{' '}
          <button className="change-username" onClick={handleChangeUsername}>
            Cambiar Usuario
          </button>
        </h1>
      </div>
      <div className="chat-content">
        <RoomList />
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <div className="message-content">
                {message.quote && (
                  <div className="quote-reply">
                    <span className="quote-user">{message.quote.user || 'Anónimo'}:</span>{' '}
                    {message.quote.message}
                  </div>
                )}
                {`${message.user || 'Anónimo'} (${new Date(
                  message.timestamp?.seconds * 1000
                ).toLocaleTimeString()}): ${message.message}`}
              </div>
              <div className="message-actions" onClick={() => toggleQuoteMenu(index)}>
                ...
                {showQuoteMenu && selectedMessageIndex === index && (
                  <div className="quote-menu" onClick={() => handleQuoteReply(message)}>
                    Quote & Reply
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        {quoteMessage && (
          <div className="quote-reply">
            Respondiendo a:{' '}
            {`${quoteMessage.user || 'Anónimo'}: ${quoteMessage.message}`}
          </div>
        )}
        <input
          className="message-input"
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Enviar
        </button>
      </div>
      <button className="create-room-button" onClick={handleCreateRoom}>
        Crear Nueva Sala
      </button>
    </div>
  );
};
// Exporta el componente Chat
export default Chat;











