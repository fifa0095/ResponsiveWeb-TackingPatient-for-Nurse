import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import MainDash from './components/MainDash/MainDash';
import Form from './components/Form/Form';
import Sidebar from './components/Sidebar';
import Login from './components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('Dashboard'); 

  const handleLogin = (credentials) => {
    // Mock authentication logic
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/main" element={
          isAuthenticated ? (
            <div className="AppGlass">
              <Sidebar setSelectedSidebarItem={setSelectedSidebarItem} />
              <div className="MainContent">
                {selectedSidebarItem === 'Dashboard' ? <MainDash /> : <Form />}
              </div>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
