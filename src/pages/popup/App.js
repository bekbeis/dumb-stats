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

  const getKcal = (val) => (
    val === 0 ? `Click to burn some calories`
    : `You have burned nearly ${formatNum(val * 0.000000239)} calories in total by these clicks`
  );

  const getDistance = (val) => ( // 
    val === 0 ? `Scroll to start your road trip along the route Budapest-Lisbon`
    : val < 242900 ? `There are ${formatNum(242900 - val)} more meters to get to Vienna from Budapest`
    : val >= 242900 && val < 242930 ? `You are in Vienna`
    : val >=242930 && val < 576430 ? `There are ${formatNum(576430 - val)} more meters to get to Prague from Vienna`
    : val >= 576430 && val < 576460 ? `You are in Prague`
    : val >= 576460 && val < 925860 ? `There are ${formatNum(925860 - val)} more meters to get to Berlin from Prague`
    : val >= 925860 && val < 925890 ? `You are in Berlin`
    : val >= 925890 && val < 1580631 ? `There are ${formatNum(1580631 - val)} more meters to get to Amsterdam from Berlin`
    : val >= 1580631 && val < 1580661 ? `You are in Amsterdam`
    : val >= 1580661 && val < 1790461 ? `There are ${formatNum(1790461 - val)} more meters to get to Brussels from Amsterdam`
    : val >= 1790461 && val < 1790491 ? `You are in Brussels`
    : val >= 1790491 && val < 2180091 ? `There are ${formatNum(2180091 - val)} more meters to get to Paris from Brussels`
    : val >= 2180091 && val < 2180121 ? `You are in Paris`
    : val >= 2180121 && val < 3455221 ? `There are ${formatNum(3455221 - val)} more meters to get to Madrid from Paris`
    : val >= 3455221 && val < 3455251 ? `You are in Madrid`
    : val >= 3455251 && val < 4079251 ? `There are ${formatNum(4079251 - val)} more meters to get to Lisbon from Madrid`
    : val >= 4079251 && val < 4079301 ? `You've finished the Budapest-Lisbon road trip. The next stop is the Moon`
    : val >= 4079301 && val < 388479301 ? `There are ${formatNum(388479301 - val)} more meters to reach the Moon`
    : `You have reached the Moon. It is the END.`
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

  const getCalculatedTime = (val) => {
    const time = calculateTime(54 * val);
    return !time ? `Visit any page to start collecting rough information about your time` 
    : `You have spent approximately ` + time + ` on this`;
  };

  const getNovelCount = (val) => (
    val === 0 ? `Press any key to know what novel you could have finished typing with your # of keystrokes`
    : val < 77710 ? `${77710 - val} more keystrokes and you could have finished typing The Little Prince`
    : val < 185650 ? `${185650 - val} more keystrokes and you could have finished typing Robinson Crusoe`
    : val < 632432 ? `${632432 - val} more keystrokes and you could have finished typing The Odyssey by Homer`
    : val < 994477 ? `${994477 - val} more keystrokes and you could have finished typing Crime and Punishment`
    : val < 1623333 ? `${1623333 - val} more keystrokes and you could have finished typing Don Quixote`
    : val < 2709358 ? `${2709358 - val} more keystrokes and you could have finished typing The Lord of the Rings trilogy`
    : val < 5095599 ? `${5095599 - val} more keystrokes and you could have finished typing the whole Harry Potter`
    : `With this number of keystrokes, you could have finished typing ${Math.floor(val / 727943)} Harry Potter books`
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
                    {getNovelCount(keyPressValue)}
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