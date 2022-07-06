import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set, child } from "firebase/database";

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
const dbRef = ref(database);

chrome.runtime.onInstalled.addListener(() => {
  set(ref(database, 'stats/scroll'), {
    totalLength: 0
  });
  set(ref(database, 'stats/clicks'), {
    count: 0
  });
});

chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.scripting.executeScript({
    target: {tabId},
    files: ['content/index.js']
  });
});

const data = ["", ""];
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//  Эта фигня вытаскивает значения на момент загрузки страницы
get(child(dbRef, 'stats')).then((snapshot) => {
  data[0] = snapshot.val().scroll.totalLength;
  data[1] = snapshot.val().clicks.count;
});
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'get-data') {
    get(child(dbRef, 'stats')).then((snapshot) => {
      data[0] = snapshot.val().scroll.totalLength;
      data[1] = snapshot.val().clicks.count;
    });
    sendResponse(data);
  }
});

console.log('The dumb-stats project is successfully loaded!');