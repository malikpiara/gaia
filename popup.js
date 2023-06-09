function appendToDOM(elementType, content) {
    const contentDiv = document.getElementById('content');
    const element = document.createElement(elementType);
    element.textContent = content;
    contentDiv.appendChild(element);
}

// Store the URL in local storage and Retrieve the list of stored URLs
function toggleSavedLink(url, title) {
    chrome.storage.local.get(['savedLinks'], function(result) {
        const savedLinks = result.savedLinks || [];
        const linkIndex = savedLinks.findIndex(link => link.url === url);
        
        if (linkIndex !== -1) {
            savedLinks.splice(linkIndex, 1);
            console.log('URL removed of local storage.');
        } else {
            savedLinks.push({url: url, title: title});
            console.log('URL saved to local storage.');
        }

        chrome.storage.local.set({ savedLinks: savedLinks }, function() {
            console.log('URL saved to local storage.');
        });

        console.log('List of stored URLS', savedLinks);
    });
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // Get URL and title of active tab
    const activeTab = tabs[0];
    const url = activeTab.url;
    const title = activeTab.title;

    // Extract main domain from the URL
    const mainDomain = removeProtocolAndPath(url);

    appendToDOM('h2', title);
    appendToDOM('p', mainDomain);

    toggleSavedLink(url, title);
  });


  // Helper functions
  function removeProtocolAndPath(urlString) {
    try {
      const url = new URL(urlString);
      return url.hostname;
    } catch (error) {
      console.error('Invalid URL:', error.message);
      return urlString;
    }
  }