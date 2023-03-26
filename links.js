function appendToDOM(elementType, content) {
    const contentDiv = document.getElementById('content');
    const element = document.createElement(elementType);
    const link = document.createElement('a');

    link.href = content;
    link.textContent = content;
    link.target = '_blank'; // Optional, opens the link in a new tab

    contentDiv.appendChild(element);

    element.appendChild(link);
}

// Retrieve the list of stored URLs
chrome.storage.local.get(['savedLinks'], function(result) {
    const savedLinks = result.savedLinks || [];

    savedLinks.forEach((link) => {
        appendToDOM('h2', `${link.title}`);
        appendToDOM('div', `${link.url}`);
    });
})