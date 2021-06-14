import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDtkDjRRL0uqtfQIlnBJEww_sZuvBdPOYo",
  authDomain: "netflix-clone-d38ea.firebaseapp.com",
  projectId: "netflix-clone-d38ea",
  storageBucket: "netflix-clone-d38ea.appspot.com",
  messagingSenderId: "833486965167",
  appId: "1:833486965167:web:d6d259eb8e62980858c75a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth};
export default db;