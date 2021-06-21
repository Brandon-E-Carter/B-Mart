import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCIvV312go5bLWe7VnFeoQMu4oCO2A3aGo",
    authDomain: "brandon-carter-project-three.firebaseapp.com",
    projectId: "brandon-carter-project-three",
    storageBucket: "brandon-carter-project-three.appspot.com",
    messagingSenderId: "231329183729",
    appId: "1:231329183729:web:deba3113bbff8caeac7650"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;