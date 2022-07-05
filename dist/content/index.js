import { i as initializeApp, g as getDatabase, r as ref, a as get, c as child, u as update } from '../chunks/index.esm2017-a43c9279.js';

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
const dbRef = ref(database);
let previousPosition = 0;
window.addEventListener('scroll', () => {
  const position = window.pageYOffset;
  const scrolled = Math.abs(position - previousPosition) * 0.0002645833;
  previousPosition = position;
  get(child(dbRef, 'stats/scroll')).then(snapshot => {
    const currentLength = snapshot.val().totalLength;
    const newTotalLength = scrolled + currentLength;
    const updates = {};
    updates['/stats/scroll/totalLength'] = newTotalLength;
    update(ref(database), updates);
  });
});
window.addEventListener('click', () => {
  get(child(dbRef, 'stats/clicks')).then(snapshot => {
    const count = snapshot.val().count;
    const newCount = count + 1;
    const updates = {};
    updates['stats/clicks/count'] = newCount;
    update(ref(database), updates);
  });
}); // (async () => {
//   let previousPosition = 0;
//   window.addEventListener('scroll', () => {
//       const dbRef = ref(database);
//       let currentLength = await get(child(dbRef, 'stats/scroll')).then((snapshot) => {
//           return snapshot.val().totalLength;
//       });
//       console.log(typeof(currentLength), currentLength);
//   });
// })();
