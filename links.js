function appendToDOM(elementType, className, content) {
    const element = document.createElement(elementType);
    element.className = className;

    if (content.isLink) {
        element.href = content.value;
        element.target = '_blank';
    } else {
        element.textContent = content.value;
    }

    return element;
}

// Retrieve the list of stored URLs
chrome.storage.local.get(['savedLinks'], function(result) {
    const savedLinks = result.savedLinks || [];
    const contentDiv = document.getElementById('content');

    savedLinks.forEach((link) => {
        const linkWrapper = appendToDOM('a', '', {value: link.url, isLink: true});
        const linkDiv = appendToDOM('div', 'savedLink', {value: '', isLink: false});
        const title = appendToDOM('h2', '', {value: link.title, isLink: false});
        const url = appendToDOM('p', '', {value: link.url, isLink: false});

        linkDiv.appendChild(title);
        linkDiv.appendChild(url);
        linkWrapper.appendChild(linkDiv);
        contentDiv.appendChild(linkWrapper);
    });
});
