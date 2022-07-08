const main = () => {
  let previousPosition = 0;
  window.addEventListener('scroll', () => {
    const position = window.pageYOffset;
    const scrolled = Math.abs(position - previousPosition) * 0.0002645833;
    previousPosition = position;
    chrome.storage.local.get(['totalLength'], val => {
      const newTotalLength = scrolled + val.totalLength;
      chrome.storage.local.set({
        totalLength: newTotalLength
      });
    });
  });
  window.addEventListener('click', () => {
    chrome.storage.local.get(['clickCount'], val => {
      const newClickCount = val.clickCount + 1;
      chrome.storage.local.set({
        clickCount: newClickCount
      });
    });
  });
  window.addEventListener('keyup', () => {
    chrome.storage.local.get(['keyPressCount'], val => {
      const newPressCount = val.keyPressCount + 1;
      chrome.storage.local.set({
        keyPressCount: newPressCount
      });
    });
  });
  window.addEventListener('load', () => {
    chrome.storage.local.get(['pagesCount'], val => {
      const newPagesCount = val.pagesCount + 1;
      chrome.storage.local.set({
        pagesCount: newPagesCount
      });
    });
  });
}; // "Clears" user's browser after extension deletion, i.e. deletes previous scripts


const distructionEvent = 'destructmyextension_' + chrome.runtime.id;

const desctructor = () => {
  document.removeEventListener(distructionEvent, desctructor);
};

document.dispatchEvent(new CustomEvent(distructionEvent));
document.addEventListener(distructionEvent, desctructor);
main(); // IMO CLASSNAYA LOGICA, KOTORUYU YA POKA NE SMOG NORMALNO REALIZOVAT :(
// var currentLength = 0;
// var previousPosition = 0;
// window.addEventListener('scroll', () => {
//   const position = window.pageYOffset;
//   const scrolled = Math.abs(position - previousPosition) * 0.0002645833;
//   previousPosition = position;
//   currentLength += scrolled;
// });
// var clickCount = 0;
// window.addEventListener('click', () => {
//   clickCount++;
// })
// var intervalFun = window.setInterval(() => {
//   if (clickCount > 0) {
//     console.log(`current: ${clickCount}`)
//     chrome.storage.local.get(['clickCount'], (val) => {
//       const oldCount = val.clickCount;
//       console.log(`old count: ${oldCount} and current: ${clickCount}`);
//       const newCount = oldCount + clickCount;
//       chrome.storage.local.set({clickCount: newCount});
//     });
//     clickCount = 0;
//   };
//   if (currentLength > 0) {
//     chrome.storage.local.get(['totalLength'], (val) => {
//       const oldLength = val.totalLength;
//       const newLength = oldLength + currentLength;
//       chrome.storage.local.set({totalLength: newLength});
//     });
//     currentLength = 0;
//   }
// }, 2000);
