import React, { useState } from 'react';
import Logo from './svgr/ds'
import ClicksIcon from './svgr/click';
import ScrollIcon from './svgr/scroll';
import KeyPressIcon from './svgr/key-press';
import PagesIcon from './svgr/page';

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

  const resetStats = () => {
    chrome.storage.local.set({totalLength: 0, clickCount: 0, keyPressCount: 0, pagesCount: 0});
    chrome.storage.local.get(['totalLength', 'clickCount', 'keyPressCount', 'pagesCount'], (val) => {
      setScrollValue(val.totalLength);
      setClicksValue(val.clickCount);
      setKeyPressValue(val.keyPressCount);
      setPagesValue(val.pagesCount);
    });
  };

  const roundValue = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const getKcal = (num) => {
    return (num * 0.000000239).toExponential(3);
  }
  
  return (
    <div className='main'>
      <div className='header-container'>
            <div id='logo'>
                <Logo />
            </div>
            <div>
                <button onClick={resetStats}>reset</button>
            </div>
        </div>
        <div className='item-container'>
            <div className='item'>
                <div id="icon">
                    <ClicksIcon />
                </div>
                <h1 className='name'>
                    clicks
                </h1>
                <h1 className='val'>
                    {clicksValue}
                </h1>
                <p className='description'>
                    {`kcal burned by these clicks: ${getKcal(clicksValue)}`}
                </p>
            </div>
        </div>
        <div className='item-container'>
            <div className='item'>
                <div id="icon">
                    <ScrollIcon />
                </div>
                <h1 className='name'>
                    scroll distance
                </h1>
                <h1 className='val'>
                    {roundValue(scrollValue)}
                </h1>
                <p className='description'>
                    The value is in meters
                </p>
            </div>
        </div>
        <div className='item-container'>
            <div className='item'>
                <div id="icon">
                    <KeyPressIcon />
                </div>
                <h1 className='name'>
                    key presses
                </h1>
                <h1 className='val'>
                    {keyPressValue}
                </h1>
                <p className='description'>
                    Еще не придумал
                </p>
            </div>
        </div>
        <div className='item-container'>
            <div className='item'>
                <div id="icon">
                    <PagesIcon />
                </div>
                <h1 className='name'>
                    pages viewed
                </h1>
                <h1 className='val'>
                    {pagesValue}
                </h1>
                <p className='description'>
                    Еще не придумал x2
                </p>
            </div>
        </div>
    </div>
  )
};

export default App;