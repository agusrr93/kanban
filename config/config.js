import firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyDaGmGfMsn0csWQozmMUGbl5UkHzFESYHU",
    authDomain: "kanban-2ee14.firebaseapp.com",
    databaseURL: "https://kanban-2ee14.firebaseio.com",
    projectId: "kanban-2ee14",
    storageBucket: "kanban-2ee14.appspot.com",
    messagingSenderId: "469927456777"
  };
  firebase.initializeApp(config);

  const db = firebase.database()

  export default db