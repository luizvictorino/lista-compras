import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate do react-router-dom
import firebase from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importe o JavaScript do Bootstrap
import './Navbar.css';

const defaultUserIcon = './logo192.png'; // Ícone padrão do usuário

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null); // Estado para armazenar o usuário atualmente autenticado
  const navigate = useNavigate(); // Use o hook useNavigate para navegação

  useEffect(() => {
    // Efeito colateral para monitorar alterações no estado de autenticação do Firebase
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user); // Define o usuário atual se estiver autenticado
      } else {
        setCurrentUser(null); // Define como nulo se não estiver autenticado
      }
    });

    return () => unsubscribe(); // Função de limpeza para remover o listener ao desmontar o componente
  }, []); // Array de dependências vazio indica que o efeito é executado apenas uma vez ao montar o componente


  // Função assíncrona para lidar com o logout do usuário
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut(); // Faz logout no Firebase
      navigate('/login'); // Redireciona para a página de login após o logout
    } catch (err) {
      console.error('Erro ao fazer logout:', err); // Exibe erro caso ocorra problema no logout
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-navbar">

        {/* Renderiza o ícone do usuário se existir usuário autenticado */}
        {currentUser && (
          <Link className="navbar-brand" to="/perfil">
            <img
              src={currentUser.photoURL || defaultUserIcon} // Usa a foto do usuário ou o ícone padrão
              alt="User"
              className="rounded-circle"
              // style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
            />
          </Link>
        )}

        {/* Link para a página de produtos */}
        <Link className="navbar-brand" to="/lista-produtos">Produtos</Link>
        
        {/* Botão de toggler para menus responsivos em telas menores */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu de navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/lista-produtos">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/perfil">Perfil</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</span> {/* Botão de logout */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;