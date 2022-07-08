import React, { useState } from 'react';

const App = () => {

  const [scrollValue, setScrollValue] = useState(0);
  const [clicksValue, setClicksValue] = useState(0);
  const [keyPressValue, setKeyPressValue] = useState(0);
  const [pagesValue, setPagesValue] = useState(0);
  
  chrome.storage.local.get(['totalLength', 'clickCount', 'keyPressCount', 'pagesCount'], (val) => {
    setScrollValue(val.totalLength);
    setClicksValue(val.clickCount);
    setKeyPressValue(val.keyPressCount);
    setPagesValue(val.pagesCount);
  });

  const roundValue = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  return (
    <div>
      <div className='heading'>
        <h1>YOUR DUMB STATS!</h1>
      </div>
      <p>Total scroll distance: {roundValue(scrollValue)} m.</p>
      <br />
      <p>
        Total clicks: {clicksValue}. You have burned {(clicksValue * 0.000000239).toExponential(3)} kcal by only clicking your mouse!
      </p>
      <br />
      <p>
        Total key presses: {keyPressValue}.
      </p>
      <br />
      <p>
        Total pages viewed: {pagesValue}.
      </p>
    </div>
  )
};

export default App;