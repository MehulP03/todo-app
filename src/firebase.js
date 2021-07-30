import friebase from "firebase";

const firebaseApp = friebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyAD1ntH6EcBREfJHWeqniwYfOzAU-phHDM",
  authDomain: "todo-34a03.firebaseapp.com",
  projectId: "todo-34a03",
  storageBucket: "todo-34a03.appspot.com",
  messagingSenderId: "446500864773",
  appId: "1:446500864773:web:07839591dbb22969976d6c"
});

const db = firebaseApp.firestore();

export default db ; 