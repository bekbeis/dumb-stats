const main = () => {
  let previousPosition = 0;
  window.addEventListener('scroll', () => {
      const position = window.pageYOffset;
      const scrolled = Math.abs(position - previousPosition) * 0.0002645833;
      previousPosition = position;
      chrome.storage.local.get(['totalLength'], (val) => {
        const newTotalLength = scrolled + val.totalLength;
        chrome.storage.local.set({totalLength: newTotalLength});
      });
  });

  window.addEventListener('click', () => {
    chrome.storage.local.get(['clickCount'], (val) => {
      const newClickCount = val.clickCount + 1;
      chrome.storage.local.set({clickCount: newClickCount});
    });
  });

  window.addEventListener('keyup', () => {
    chrome.storage.local.get(['keyPressCount'], (val) => {
      const newPressCount = val.keyPressCount + 1;
      chrome.storage.local.set({keyPressCount: newPressCount});
    });
  });
  
  window.addEventListener('load', () => {
    chrome.storage.local.get(['pagesCount'], (val) => {
      const newPagesCount = val.pagesCount + 1;
      chrome.storage.local.set({pagesCount: newPagesCount});
    });
  });
};

// "Clears" user's browser after extension deletion, i.e. deletes previous scripts
const distructionEvent = 'destructmyextension_' + chrome.runtime.id;
const desctructor = () => {
  document.removeEventListener(distructionEvent, desctructor);
};
document.dispatchEvent(new CustomEvent(distructionEvent));
document.addEventListener(distructionEvent, desctructor);

main();