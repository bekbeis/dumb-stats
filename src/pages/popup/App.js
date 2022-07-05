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
      <div className='heading'>
        <h1>YoUr DuMb StAtS!</h1>
      </div>
      <p>Total scroll distance: {Math.round((scrollValue + Number.EPSILON) * 100) / 100} m</p>
    </div>
  )
};

export default App;