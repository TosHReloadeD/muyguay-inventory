import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyAg1oxa1GmcwBtEHuhDmY0rXLIzOrm-Ck8',
  authDomain: 'muyguya-inventario.firebaseapp.com',
  databaseURL: 'https://muyguya-inventario.firebaseio.com',
  projectId: 'muyguya-inventario',
  storageBucket: 'muyguya-inventario.appspot.com',
  messagingSenderId: '38898977236',
  appId: '1:38898977236:web:7c4e05fea270430b996e41'
});

export { firebaseConfig as firebase };
