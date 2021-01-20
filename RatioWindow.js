const { BrowserWindow } = require('electron');

function __handleWillResize(event, newSize) {
    event.preventDefault();
    event.sender.setSize(newSize.width, parseInt(newSize.width * this.height / this.width) + (event.sender.getSize()[1] - event.sender.getContentSize()[1]));
}

class RatioWindow extends BrowserWindow {
    constructor(options) {
        super(options);
        this.on('will-resize', __handleWillResize.bind(options));
    }
}

module.exports = RatioWindow;
