// src/components/CreateRoom.js

// Importa las bibliotecas necesarias
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Componente funcional CreateRoom
const CreateRoom = () => {
  // Hooks de estado y navegación
  const [newRoom, setNewRoom] = useState('');
  const navigate = useNavigate();

  // Función para crear una nueva sala
  const handleCreateRoom = async () => {
    if (newRoom.trim() !== '') {
      const roomRef = firebase.firestore().collection('rooms').doc(newRoom);

      // Verificar si la sala ya existe
      const roomSnapshot = await roomRef.get();
      if (!roomSnapshot.exists) {
        await roomRef.set({ messages: [] });
        navigate(`/chat?room=${newRoom}`);
      } else {
        alert('La sala ya existe. Por favor, elige otro nombre.');
      }
    }
  };

  // Renderizado del componente CreateRoom
  return (
    <div className="create-room-container">
      <h2>Crear Nueva Sala</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre de la nueva sala"
          onChange={(e) => setNewRoom(e.target.value)}
        />
      </div>
      <button onClick={handleCreateRoom}>Crear Sala</button>
    </div>
  );
}

// Exporta el componente CreateRoom
export default CreateRoom;

