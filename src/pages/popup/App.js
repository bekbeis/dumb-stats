import React, { useState } from 'react';

const App = () => {

  const [scrollValue, setScrollValue] = useState("");
  const [clicksValue, setClicksValue] = useState("");
  
  chrome.runtime.sendMessage('get-data', (response) => {
    const [tempScroll, tempCount] = response;
    setScrollValue(tempScroll);
    setClicksValue(tempCount);
  });

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
    </div>
  )
};

export default App;