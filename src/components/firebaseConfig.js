import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth'; 


const firebaseConfig = {
  apiKey: "AIzaSyC4IpXHz4wbwb5emaPFoVpz51gQvkDoF2U",
  authDomain: "etec22s2.firebaseapp.com",
  databaseURL: "https://etec22s2-default-rtdb.firebaseio.com",
  projectId: "etec22s2",
  storageBucket: "etec22s2.appspot.com",
  messagingSenderId: "429631871423",
  appId: "1:429631871423:web:8a91da2ae6bb57f88fa90a",
  measurementId: "G-LZS9HLK6PQ"
}

// Inicialize o Firebase
// Delete o Firebase App existente, se existir
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
