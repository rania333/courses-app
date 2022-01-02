// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getFirestore,
addDoc, collection, onSnapshot, deleteDoc, query, where, getDocs, orderBy,
getDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const firestore = getFirestore(app);

/***************** data ******************/
const id = document.getElementById('ID');
const name = document.getElementById('name');
const mark = document.getElementById('mark');
const hour = document.getElementById('hour');
const available = document.getElementById('available');

const saveBtn = document.getElementById('save');

/******************** add ************************/
function saveData() {
    var data = {
        Name: name.value,
        Mark: parseInt(mark.value),
        Hour: parseInt(hour.value),
        Avaiable: available.value
    }

    if(id.value == "") {
        addDoc(collection(firestore, 'course'), data)
        .then(course => {
            console.log(course.id);
            clearData();
        });   
    } else {
        updateDoc(doc(firestore, 'course', id.value), data)
        .then(course => {
            console.log(course, "p"); //undefined
            clearData();
        });
    }
}
saveBtn.addEventListener('click', saveData);

/******************* clear *****************/
function clearData() {
    id.value = "";
    name.value = "";
    mark.value = "";
    hour.value = "";
    available.value = "";
}

/****************** display ***********************/
//snapshot
onSnapshot(collection(firestore, 'course'), (snapshot) => {
    var body = document.querySelector('#courseData>tbody');
    body.innerHTML = ''; 
    snapshot.forEach(doc => {
        displayData(doc);
    })
});



function displayData(course) {
    const courseData = course.data();
    var body = document.querySelector('#courseData>tbody');
    var row = `
            <tr>
                <td>${course.id}</td>
                <td>${courseData.Name}</td>
                <td>${courseData.Mark}</td>
                <td>${courseData.Hour}</td>
                <td>${courseData.Avaiable}</td>
                <td>
                    <button type="button" class="btn btn-primary" 
                    onclick="updateCourse('${course.id}')">
                        <i class="fas fa-edit"></i></button>

                    <button type="button" class="btn btn-danger" 
                    onclick="deleteCourse('${course.id}')">
                        <i class="fas fa-trash-alt"></i></button>
                    </td>
            `
    body.innerHTML += row;

}

/********************* update product **********************/
window.updateCourse = updateCourse;
function updateCourse(ID) {
    getDoc(doc(firestore, 'course', ID))
    .then(courseData => {
        var course = courseData.data();
        //fill inputs
        id.value = ID;
        name.value = course.Name;
        mark.value = course.Mark;
        hour.value = course.Hour;
        available.value = course.Avaiable;
    });
}

/******************** delete product ************************/
window.deleteCourse = deleteCourse;
function deleteCourse(ID) {
    deleteDoc(doc(firestore, 'course', ID))
    .then(data => {
        console.log(data); //undefined
    });
}


/*******************query**********************/
const availabilityFilter = document.getElementById('avFilter');
const markFilter = document.getElementById('markFilter');

window.testQuery = testQuery;
function testQuery() {
    var q;
    if(availabilityFilter.value && markFilter.value) {
        q = query(collection(firestore, 'course'), 
        where('Avaiable', '==', availabilityFilter.value),
        where('Mark', '>=', parseInt(markFilter.value)),
        orderBy('Mark'));
    } else if (availabilityFilter.value) {
        q = query(collection(firestore, 'course'),
        where('Avaiable', '==', availabilityFilter.value));
    }

    getDocs(q)
    .then(data => {
        document.querySelector('#courseData>tbody').innerHTML = '';
        data.forEach(doc => {
            console.log(doc.data());
            displayData(doc);
        })
    })
};





/*****************logout******************/
// Import the functions you need from the SDKs you need

import { getAuth, signOut , onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const auth = getAuth(app);

const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');


function Logout() {
    signOut(auth);
}
onAuthStateChanged(auth,(user)=>{
    if(user)
    {
        userName.textContent=user.email;
    }
    else{
        location.assign("./login.html");
    }
})

logoutBtn.addEventListener('click', Logout);

