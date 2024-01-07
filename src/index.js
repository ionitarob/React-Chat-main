// src/index.js

// Importa las bibliotecas necesarias
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { UserProvider } from './UserContext';

// Configuración de Firebase con las credenciales del proyecto
const firebaseConfig = {
  apiKey: "AIzaSyBr734SL7tX-JHIfw16_Yi8kKgsTt8qVu4",
  authDomain: "chat-room-ef581.firebaseapp.com",
  projectId: "chat-room-ef581",
  storageBucket: "chat-room-ef581.appspot.com",
  messagingSenderId: "253415620064",
  appId: "1:253415620064:web:d00460aa138fcceef2bf85"
};

// Inicializa la instancia de Firebase con la configuración proporcionada
firebase.initializeApp(firebaseConfig);

// Renderiza la aplicación envuelta en el proveedor de contexto de usuario
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Informa sobre las métricas web al servidor (opcional)
reportWebVitals();


