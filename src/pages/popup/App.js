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
    }, 350);
    return () => clearInterval(interval);
  }, []);

  const roundNum = (val) => ( Math.round((val + Number.EPSILON) * 100) / 100 );

  const formatNum = (val) => (
    ((val < 1) && (val.toString().length <= 9)) ? val
    : ((val >= 1) && (val.toString().length <= 13)) ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : val.toExponential(3)
  );

  const calculateTime = (seconds) => {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  };

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
    (val < 384400000) ? `there are ${formatNum(384400000 - val)} more meters to reach the Moon`
    : (val >= 384400000 && val < 384400010) ? `you are incredible! you have reached the Moon!`
    : (val > 384400010 && val < 149597870700) ? `there are ${formatNum(149597870700 - val)} more meters to reach the Sun`
    : (val >= 149597870700 && val < 149597870710) ? `you are even more incredible! you have reached the Sun!`
    : (val > 149597870710 && val < 149597870720) ? `bro, you are going to infinity...`
    : `you have reached the end`
  );

  const getCalculatedTime = (val) => {
    const time = calculateTime(54 * val);
    return !time ? `nothing to display yet :(` 
    : `you have spent approximately ` + time + ` on this`;
  };

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
                    {getCalculatedTime(pagesValue)}
                </p>
            </div>
        </div>
    </div>
  )
};

export default App;