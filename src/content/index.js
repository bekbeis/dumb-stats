import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA9FeuOGTJ9a9rAoyB-HGvqh-Bj2e97BCo",
  authDomain: "dumb-stats-db.firebaseapp.com",
  projectId: "dumb-stats-db",
  storageBucket: "dumb-stats-db.appspot.com",
  messagingSenderId: "782843106344",
  appId: "1:782843106344:web:4e66d7f340320e16b6d11d",
  databaseURL: "https://dumb-stats-db-default-rtdb.europe-west1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(); 

// let previousPosition = 0;
// window.addEventListener('scroll', () => {
//     let currentLength;
//     const dbRef = ref(database);
//     get(child(dbRef, 'stats/scroll')).then((snapshot) => {
//         currentLength = snapshot.val().totalLength;
//         console.log(currentLength);
//     });
//     console.log(typeof(currentLength), currentLength);
// })

let previousPosition = 0;
window.addEventListener('scroll', () => {
    let currentLength;
    const dbRef = ref(database);
    get(child(dbRef, 'stats/scroll')).then((snapshot) => {
        currentLength = snapshot.val().totalLength;
        console.log(currentLength);
    });
    console.log(typeof(currentLength), currentLength);
});

console.log("content script");