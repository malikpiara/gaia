// Function to handle the context menu item click event
function saveLinkToGaia(info, tab) {
    // Perform your desired action with the link URL
    console.log('Save Link to Gaia clicked. URL:', info.linkUrl);
  }
  
  // Set up the listener for the context menu item click event
  chrome.contextMenus.onClicked.addListener(saveLinkToGaia);
  
  // Function to create the context menu item when the extension is installed
  chrome.runtime.onInstalled.addListener(function () {
    let title = "Save Link to Gaia";
    let id = chrome.contextMenus.create({
      title: title,
      id: 'saveLinkToGaia'
    });
  });
  