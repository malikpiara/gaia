function appendToDOM(elementType, content) {
    const contentDiv = document.getElementById('content');
    const element = document.createElement(elementType);
    element.textContent = content;
    contentDiv.appendChild(element);
}

// Retrieve the list of stored URLs
chrome.storage.local.get(['savedLinks'], function(result) {
    const savedLinks = result.savedLinks || [];

    savedLinks.forEach((link) => {
        appendToDOM('li', link);
    });
})