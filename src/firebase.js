import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyADTs9dNWcOayOUm8A7Y_DBLTbSVISs9hg',
  authDomain: 'slack-clone-74383.firebaseapp.com',
  projectId: 'slack-clone-74383',
  storageBucket: 'slack-clone-74383.appspot.com',
  messagingSenderId: '252191033153',
  appId: '1:252191033153:web:3ae1772d0d5a0a47eac3c0',
  measurementId: 'G-EXG9PTB5ZT',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
