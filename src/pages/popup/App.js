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

  const roundNum = (val) => ( Math.round((val + Number.EPSILON) * 100) / 100 );

  const formatNum = (val) => (
    ((val < 1) && (val.toString().length <= 9)) || ((val >= 1) && (val.toString().length <= 13))
    ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : val.toExponential(3)
  );

  const getData = () => {
    chrome.storage.local.get(['totalLength', 'clickCount', 'keyPressCount', 'pagesCount'], (val) => {
        setScrollValue(roundNum(val.totalLength));
        setClicksValue(val.clickCount);
        setKeyPressValue(val.keyPressCount);
        setPagesValue(val.pagesCount);
      });
  };

  getData();

  const resetStats = () => {
    chrome.storage.local.set({totalLength: 0, clickCount: 0, keyPressCount: 0, pagesCount: 0});
    getData();
  };

  const getKcal = (val) => ( `kcal burned by these clicks: ${formatNum(val * 0.000000239)}` );

  const getDistance = (val) => (
    (val < 384400000) ? `meters to the Moon: ${formatNum(384400000 - val)}`
    : (val >= 384400000 && val < 384400050) ? `you've reached the Moon!`
    : (val > 384400050 && val < 149597870700) ? `meters to the Sun: ${formatNum(149597870700 - val)}`
    : (val >= 149597870700 && val < 149597870750) ? `you've reached the Sun!`
    : (val > 149597870750 && val < 149597871000) ? `bro, you are going to infinity...`
    : `you've reached the end.`
  );

  const getWikiStat = (val) => (
    (val > 56387981) ?`you've viewed more pages than Wikipedia has`
    : `wiki has ${formatNum(56387981 - val)} more pages`
  );

  const getLoremIpsum = (val) => (
    `lorem ipsum texts you've typed: ${formatNum(roundNum(val / 2557))}`
  );

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
                    {formatNum(clicksValue)}
                </h1>
                <p className='description'>
                    {getKcal(clicksValue)}
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
                    {formatNum(scrollValue)}
                </h1>
                <p className='description'>
                    {getDistance(scrollValue)}
                </p>
            </div>
        </div>
        <div className='item-container'>
            <div className='item'>
                <div id="icon">
                    <KeyPressIcon />
                </div>
                <h1 className='name'>
                    keystrokes
                </h1>
                <h1 className='val'>
                    {formatNum(keyPressValue)}
                </h1>
                <p className='description'>
                    {getLoremIpsum(keyPressValue)}
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
                    {formatNum(pagesValue)}
                </h1>
                <p className='description'>
                    {getWikiStat(pagesValue)}
                </p>
            </div>
        </div>
    </div>
  )
};

export default App;