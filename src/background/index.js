chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({totalLength: 0, clickCount: 0, keyPressCount: 0, pagesCount: 0});
});

// Executes ContentScript on all tabs (including already open ones)
chrome.runtime.onInstalled.addListener(async () => {
  for (const contentScript of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({url: contentScript.matches})) {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: contentScript.js,
      });
    }
  }
});

// Executes ContentScript only on Updated/newly loaded tabs
// chrome.tabs.onUpdated.addListener((tabId) => {
//   chrome.scripting.executeScript({
//     target: {tabId},
//     files: ['content/index.js']
//   });
// });

console.log('The dumb-stats project is successfully loaded!');