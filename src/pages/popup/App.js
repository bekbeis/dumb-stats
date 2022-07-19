import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const interval = setInterval(() => {
        chrome.storage.local.get(['totalLength'], (val) => {
            setScrollValue(roundNum(val.totalLength));
        });
    }, 200);
    return () => clearInterval(interval);
  }, [])

  const roundNum = (val) => ( Math.round((val + Number.EPSILON) * 100) / 100 );

  const formatNum = (val) => (
    ((val < 1) && (val.toString().length <= 9)) ? val
    : ((val >= 1) && (val.toString().length <= 13)) ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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

  const getKcal = (val) => ( `you have burned ${formatNum(val * 0.000000239)} calories in total by these clicks` );

  const getDistance = (val) => (
    (val < 384400000) ? `you have ${formatNum(384400000 - val)} meters more to reach the Moon`
    : (val >= 384400000 && val < 384400010) ? `you are incredible! you have reached the Moon!`
    : (val > 384400010 && val < 149597870700) ? `you have ${formatNum(149597870700 - val)} meters more to reach the Sun`
    : (val >= 149597870700 && val < 149597870710) ? `you are even more incredible! you have reached the Sun!`
    : (val > 149597870710 && val < 149597870720) ? `bro, you are going to infinity...`
    : `you have reached the end`
  );

  const getWikiStat = (val) => (
    (val > 56387981) ?`you've viewed more pages than Wikipedia has`
    : `wiki has ${formatNum(56387981 - val)} more pages than you have seen so far`
  );

  const getLoremIpsum = (val) => (
    `you could have typed ${formatNum(roundNum(val / 2557))} lorem ipsum texts with this number of keystrokes`
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