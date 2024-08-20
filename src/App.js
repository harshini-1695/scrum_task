import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListTicket from './pages/ListTicket';
import CreateEditTicket from './pages/CreateEditTicket';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListTicket />} />
        <Route path="/form/:ticketId" element={<CreateEditTicket />} />
        <Route path="/form" element={<CreateEditTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
