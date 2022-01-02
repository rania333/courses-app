// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getAuth, signInWithEmailAndPassword , onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDV5DETa2nBHiJlPqpea_aEEEP2cDzm4Go",
    authDomain: "courseproject-542bb.firebaseapp.com",
    projectId: "courseproject-542bb",
    storageBucket: "courseproject-542bb.appspot.com",
    messagingSenderId: "61663860785",
    appId: "1:61663860785:web:52ac4b96ce0fea7c7f1d10"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


window.submitHandler =  submitHandler;
function submitHandler(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;
    try {
        signin(email, pass);
    } catch(e) {
        alert(e);
    }
}


function signin(email, pass) {
    console.log('rrrrrrrr');
    signInWithEmailAndPassword(auth, email, pass)
    .then(user => {
        console.log(user.user.uid);
    }).catch((err)=>{
        console.log(err.message);
    })
}

onAuthStateChanged(auth , user => {
    if(user) {
        location.assign('./index.html');
    }
})