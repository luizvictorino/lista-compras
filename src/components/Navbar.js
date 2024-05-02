// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importe o JavaScript do Bootstrap


const Navbar = () => {

  const handleLogout = async () => {
    try {
        await firebase.auth().signOut();
    } catch (err) {
        console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/lista-tarefas">Tarefas</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/lista-tarefas">Home</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
