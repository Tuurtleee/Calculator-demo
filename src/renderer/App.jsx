/** @jsxImportSource @emotion/react */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './Components/Menu'
import { css } from '@emotion/react'
import { useState } from 'react';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu/>} />
      </Routes>
    </Router>
  );
}
