chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0];
    let url = activeTab.url;
    let title = activeTab.title;

    // Accessing the DOM to the url and title.
    const contentDiv = document.getElementById('content');
    const titleElement = document.createElement('h2');
    const urlElement = document.createElement('h2');

    titleElement.textContent = title;
    urlElement.textContent = url;
    
    contentDiv.appendChild(titleElement);
    contentDiv.appendChild(urlElement);
  });