chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.local.set({
    totalLength: 0,
    clickCount: 0,
    keyPressCount: 0,
    pagesCount: 0
  }); // Executes ContentScript on all tabs (including already open ones)

  for (const contentScript of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({
      url: contentScript.matches
    })) {
      if (tab.url.includes("webstore")) continue;
      chrome.scripting.executeScript({
        target: {
          tabId: tab.id
        },
        files: contentScript.js
      });
    }
  }
});
console.log('The dumb-stats project is successfully loaded!');
