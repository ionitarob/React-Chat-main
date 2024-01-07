// src/components/RoomList.js

// Importa las bibliotecas necesarias
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Componente funcional RoomList
const RoomList = () => {
  // Hook de estado para almacenar la lista de salas
  const [rooms, setRooms] = useState([]);

  // Efecto secundario para obtener la lista de salas desde Firestore
  useEffect(() => {
    const firestore = firebase.firestore();
    const roomsRef = firestore.collection('rooms');

    const unsubscribe = roomsRef.onSnapshot((snapshot) => {
      // Mapea los documentos de Firestore a un formato más manejable
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData);
    });

    return () => unsubscribe();
  }, []);

  // Renderizado del componente RoomList
  return (
    <div className="room-list">
      <h2>Salas Disponibles</h2>
      <ul>
        {/* Mapea sobre la lista de salas y genera enlaces a cada sala */}
        {rooms.map((room) => (
          <li key={room.id}>
            <Link to={`/chat?room=${room.id}`}>{room.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exporta el componente RoomList
export default RoomList;
