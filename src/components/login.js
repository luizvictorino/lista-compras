import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'
import "./Login.css"
import firebase from './firebaseConfig'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Importe o Firestore para acessar o banco de dados
import { green } from '@mui/material/colors';

export const Login = () => {

  // Verifica se o usuário já está autenticado ao carregar a página
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Redireciona para a página de lista de produtos se o usuário estiver autenticado
      window.location.href = "/lista-produtos"
    } else {
      // Permanece na página de login se o usuário não estiver autenticado
    }
  })

  const [email, setEmail] = useState('') // Estado para armazenar o email digitado
  const [password, setPassword] = useState(''); // Estado para armazenar a senha digitada
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro de autenticação

  // Efeito para verificar o login do usuário e excluir produtos se existirem
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Consulta os produtos do usuário logado
          const snapshot = await firebase.firestore().collection('produtos')
            .where('userId', '==', user.uid)
            .get();
          // Para cada produto encontrado, exclui-o do Firestore
          snapshot.docs.forEach(async (doc) => {
            await firebase.firestore().collection('produtos').doc(doc.id).delete();
          });

          // Redireciona para a página de lista de produtos após excluir os produtos
          window.location.href = "/lista-produtos";
        } catch (error) {
          console.error('Erro ao excluir produtos:', error);
          setError('Erro ao excluir produtos: ' + error.message);
        }
      }
    });
    // Limpa o listener do Firebase ao desmontar o componente
    return () => unsubscribe();
  }, []); // O efeito executa apenas uma vez, ao montar o componente

  // Função para autenticar com Google
  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase.auth().signInWithPopup(provider)
        .then(() => {
          // Redireciona para a página de lista de produtos após login bem-sucedido
          window.location.href = "/lista-produtos"
        })
    } catch (error) {
      setError(error.message) // Define o erro caso ocorra algum problema durante o login
    }
  }

  // Função para autenticar com email e senha
  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          // Redireciona para a página de lista de produtos após login bem-sucedido
          window.location.href = "/lista-produtos"
        })
    } catch (err) {
      setError(err.message) // Define o erro caso ocorra algum problema durante o login
    }
  }

  // Função para criar uma nova conta com email e senha
  const handleCreate = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          // Redireciona para a página de lista de produtos após a criação da conta bem-sucedida
          window.location.href = "/lista-produtos"
        })
    } catch (err) {
      setError(err.message) // Define o erro caso ocorra algum problema durante a criação da conta
    }
  }

  return (
    <div className='login-container'>
      <h1>Etec AE Produtos</h1>
      <img alt='logo da etec' src='https://upload.wikimedia.org/wikipedia/commons/b/b4/Logo_da_Etec_Albert_Einstein.jpg' />
      <TextField className='input'
        sx={{ width: "100%", marginY: 1 }}
        variant='outlined'
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField className='input'
        sx={{ width: "100%", 
        marginY: 1,
        color: green,
       }}
        variant='outlined'
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='bLogin' onClick={handleLogin}>Login</button>
      <button className='bLogin' onClick={handleCreate}>Cadastrar</button>
      <button className='bLogin' onClick={handleGoogleLogin}><i className="bi bi-google"></i> Continue com Google</button>
      {error && <p className='login-error'>{error}</p>}
    </div>
  )
}
