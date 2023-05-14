(() => {
    window.onerror = function myErrorHandler(description, url, lineNumber) {
        gtag?.('event', 'exception', {
            description
        });
        return false;
    }
})()