// TaskAPI.js

import firebase from './firebaseConfig'; // Importe o módulo firebaseConfig onde o Firebase foi inicializado

const collectionName = 'produtos'; // Nome da coleção no Firestore

/**
 * Cria um novo produto no Firestore.
 * @param {Object} produto - Objeto contendo os dados do produto a ser criado.
 * @param {string} userId - ID do usuário associado ao produto.
 * @returns {Promise<string>} - Retorna o ID do documento criado.
 * @throws {Error} - Lança um erro se houver problemas ao adicionar o produto.
 */
const createTask = async (produto, userId) => {
  try {
    const docRef = await firebase.firestore().collection(collectionName).add({
      ...produto,
      userId: userId, // Incluir o ID do usuário como parte dos dados do produto
      createdAt: firebase.firestore.FieldValue.serverTimestamp() // Timestamp de quando o produto foi criado
    });
    return docRef.id; // Retorna o ID do documento criado
  } catch (error) {
    throw new Error('Erro ao adicionar produto no Firestore: ' + error.message);
  }
};

/**
 * Retorna todos os produtos associados ao usuário especificado.
 * @param {string} userId - ID do usuário para filtrar os produtos.
 * @returns {Promise<Array<Object>>} - Retorna um array de objetos contendo os produtos.
 * @throws {Error} - Lança um erro se houver problemas ao buscar os produtos.
 */
const readTasks = async (userId) => {
  try {
    const snapshot = await firebase.firestore().collection(collectionName)
                                    .where('userId', '==', userId)
                                    .orderBy('createdAt', 'desc')
                                    .get();
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return tasks;
  } catch (error) {
    throw new Error('Erro ao buscar produtos no Firestore: ' + error.message);
  }
};

/**
 * Exclui um produto do Firestore com base no ID do documento.
 * @param {string} taskId - ID do documento do produto a ser excluído.
 * @throws {Error} - Lança um erro se houver problemas ao excluir o produto.
 */
const deleteTask = async (taskId) => {
  try {
    await firebase.firestore().collection(collectionName).doc(taskId).delete();
  } catch (error) {
    throw new Error('Erro ao excluir produto no Firestore: ' + error.message);
  }
};

// Exporta os métodos para serem utilizados em outros módulos
export default { 
    createTask, 
    readTasks, 
    deleteTask 
};
