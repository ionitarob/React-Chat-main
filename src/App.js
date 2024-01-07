// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de unirse a la sala */}
        <Route path="/" element={<Join />} />

        {/* Ruta para la página principal del chat */}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;


