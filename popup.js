var message = document.querySelector('#message');
var optionsUrl = chrome.extension.getURL('options.html');
message.innerHTML = '<a target="_blank" href="' +
    optionsUrl + '">设置</a>';

