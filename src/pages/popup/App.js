import React, { useState } from 'react';
import database from '../../background/';
import { ref, child, get } from 'firebase/database';

const App = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const dbRef = ref(database);
  get(child(dbRef, 'stats/scroll')).then((snapshot) => {
      setScrollValue(snapshot.val().totalLength);
  });

  return (
    <div>
      <h1>You have scrolled {scrollValue} meters!</h1>
    </div>
  )
}

export default App
