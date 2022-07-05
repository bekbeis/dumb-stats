import React, { useState } from 'react';
import database from '../../background/';
import { ref, child, get } from 'firebase/database';

const App = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const [clicksValue, setClicksValue] = useState(0);
  const dbRef = ref(database);
  get(child(dbRef, 'stats/scroll')).then((snapshot) => {
      setScrollValue(snapshot.val().totalLength);
  });
  get(child(dbRef, 'stats/clicks')).then((snapshot) => {
    setClicksValue(snapshot.val().count);
  })

  return (
    <div>
      <div className='heading'>
        <h1>YoUr DuMb StAtS!</h1>
      </div>
      <p>Total scroll distance: {Math.round((scrollValue + Number.EPSILON) * 100) / 100} m.</p>
      <br />
      <p>
        Total clicks number: {clicksValue}. You have burned {clicksValue * 0.001 * 	0.000239} kcal by only clicking your mouse!
      </p>
    </div>
  )
};

export default App;