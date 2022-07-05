import { i as initializeApp, g as getDatabase, s as set, r as ref } from '../chunks/index.esm2017-a43c9279.js';

const firebaseConfig = {
  apiKey: "AIzaSyA9FeuOGTJ9a9rAoyB-HGvqh-Bj2e97BCo",
  authDomain: "dumb-stats-db.firebaseapp.com",
  projectId: "dumb-stats-db",
  storageBucket: "dumb-stats-db.appspot.com",
  messagingSenderId: "782843106344",
  appId: "1:782843106344:web:4e66d7f340320e16b6d11d",
  databaseURL: "https://dumb-stats-db-default-rtdb.europe-west1.firebasedatabase.app/"
};
initializeApp(firebaseConfig);
const database = getDatabase();
chrome.runtime.onInstalled.addListener(() => {
  set(ref(database, 'stats/scroll'), {
    totalLength: 0
  });
  set(ref(database, 'stats/clicks'), {
    count: 0
  });
});
chrome.tabs.onUpdated.addListener(tabId => {
  chrome.scripting.executeScript({
    target: {
      tabId
    },
    files: ['content/index.js']
  });
});
console.log('The dumb-stats project is successfully loaded!');

export { database as default };
