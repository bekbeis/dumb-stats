import React, { useState } from 'react';

const App = () => {

  const [scrollValue, setScrollValue] = useState(0);
  const [clicksValue, setClicksValue] = useState(0);
  const [keyPressValue, setKeyPressValue] = useState(0);
  
  chrome.storage.local.get(['totalLength'], (val) => {
    setScrollValue(val.totalLength);
  });
  chrome.storage.local.get(['clickCount'], (val) => {
    setClicksValue(val.clickCount);
  });
  chrome.storage.local.get(['keyPressCount'], (val) => {
    setKeyPressValue(val.keyPressCount);
  })

  return (
    <div>
      <div className='heading'>
        <h1>YoUr DuMb StAtS!</h1>
      </div>
      <p>Total scroll distance: {Math.round((scrollValue + Number.EPSILON) * 100) / 100} m.</p>
      <br />
      <p>
        Total clicks number: {clicksValue}. You have burned {clicksValue * 0.000000239} kcal by only clicking your mouse!
      </p>
      <p>
        Total key presses number: {keyPressValue}.
      </p>
    </div>
  )
};

export default App;