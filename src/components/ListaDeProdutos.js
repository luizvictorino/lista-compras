import React, { useState, useEffect } from 'react';
import './ListaDeProdutos.css';
import firebase from './firebaseConfig';
import Navbar from './Navbar';
import TaskAPI from './TaskAPI';

const ListaDeProdutos = () => {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos do usuário
  const [novoProduto, setNovoProduto] = useState(''); // Estado para o novo produto a ser adicionado
  const [novaQtde, setNovaQtde] = useState(1); // Estado para a quantidade do novo produto
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para controlar exibição do formulário
  const userId = firebase.auth().currentUser?.uid; // Obtém o ID do usuário atualmente autenticado

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        if (userId) {
          // Busca os produtos do usuário no Firestore utilizando o ID do usuário
          const produtosDoUsuario = await TaskAPI.readTasks(userId);
          setProdutos(produtosDoUsuario); // Atualiza o estado de produtos com os dados obtidos
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    // Chama fetchProdutos ao montar o componente ou quando userId mudar
    if (userId) {
      fetchProdutos();
    }
  }, [userId]);

  // Função para adicionar um novo produto
  const adicionarProduto = async () => {
    try {
      // Cria um novo produto no Firestore com a descrição e quantidade fornecidas pelo usuário
      const newTaskId = await TaskAPI.createTask({ descricao: novoProduto, quantidade: novaQtde }, userId);
      // Atualiza o estado de produtos adicionando o novo produto
      const updatedProdutos = [...produtos, { id: newTaskId, descricao: novoProduto, quantidade: novaQtde }];
      setProdutos(updatedProdutos);
      setNovoProduto(''); // Limpa o campo de entrada do novo produto
      setNovaQtde(1); // Reseta a quantidade para o valor padrão
      setMostrarFormulario(false); // Fecha o formulário de adição de produto
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  // Função para remover um produto existente
  const removerProduto = async (taskId) => {
    try {
      // Exclui o produto do Firestore com base no ID do produto
      await TaskAPI.deleteTask(taskId);
      // Atualiza o estado de produtos removendo o produto com o ID correspondente
      const updatedProdutos = produtos.filter((produto) => produto.id !== taskId);
      setProdutos(updatedProdutos);
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div className='lista-de-produtos'>
      <h1>Produtos Etec</h1>
      <Navbar />
      {mostrarFormulario && (
        <div className='adicionar-produto'>
          <input
            type='text'
            value={novoProduto}
            onChange={(e) => setNovoProduto(e.target.value)}
            placeholder='Digite um novo produto'
          />
          <input
            type='number'
            value={novaQtde}
            onChange={(e) => setNovaQtde(e.target.value)}
          />
          <button onClick={adicionarProduto}>Adicionar</button>
        </div>
      )}
      {!mostrarFormulario && (
        <button className='botao-flutuante' onClick={() => setMostrarFormulario(true)}>
          +
        </button>
      )}
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id} className='produto'>
            <div>
              {produto.descricao} - Quantidade: {produto.quantidade}
            </div>
            {/* Botão para remover o produto, que chama a função removerProduto com o ID do produto */}
            <div className='remover-produto' onClick={() => removerProduto(produto.id)}>
              Excluir
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeProdutos;
