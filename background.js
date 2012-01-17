function loadInjectedCSS(event, path) {
    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();

    event.source.postMessage({
        topic: 'LoadedInjectedCSS',
        data: {
            css: req.responseText,
            path: path
        }
    });
}

function onMessage(event) {
    var message = event.data;
    if (message.topic === 'LoadInjectedCSS') {
        var path = message.data;
        loadInjectedCSS(event, path);
    }
}

window.addEventListener('load', function() {
    opera.extension.onmessage = onMessage;
}, false);

opera.postError("fogbugz.improv loaded");
