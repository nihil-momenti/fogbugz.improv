function loadInjectedFile(event, path) {
    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();

    event.source.postMessage({
        topic: 'LoadedInjectedFile',
        data: {
            content: req.responseText,
            path: path
        }
    });
}

function onMessage(event) {
    var message = event.data;
    if (message.topic === 'LoadInjectedFile') {
        var path = message.data;
        loadInjectedFile(event, path);
    }
}

window.addEventListener('load', function() {
    opera.extension.onmessage = onMessage;
}, false);

opera.postError("fogbugz.improv loaded");
