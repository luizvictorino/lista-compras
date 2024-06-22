import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';



// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAPzk95v3hDaboNr7E21LJt4CDDKvkEqyg",
  authDomain: "lista-de-compra-95749.firebaseapp.com",
  projectId: "lista-de-compra-95749",
  storageBucket: "lista-de-compra-95749.appspot.com",
  messagingSenderId: "189132411574",
  appId: "1:189132411574:web:863279253ec6e596588c17"
};

/**
 * Inicializa o Firebase com a configuração fornecida.
 * Se houver um aplicativo Firebase existente, ele será excluído e re-inicializado.
 */
if (firebase.apps.length) {
  firebase.apps[0].delete()
    .then(() => {
      console.log('Firebase App excluído com sucesso');
      // Inicialize o Firebase com a nova configuração
      firebase.initializeApp(firebaseConfig);
    })
    .catch(error => {
      console.error('Erro ao excluir o Firebase App:', error);
    });
} else {
  console.log('Nenhum Firebase App encontrado para excluir');
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const firestore = firebase.firestore();
export const auth = firebase.auth();