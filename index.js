const { app, BrowserWindow } = require('electron')
const path = require('path');

// Global variable that holds the app window
let win

function createWindow() {

  // Creating the browser window
  win = new BrowserWindow({
    width: 915,
    height: 638,
		backgroundColor: '#000000',
    webPreferences: {
      webviewTag: true
    }
  })


  win.loadURL('file://' + __dirname + '/app/index.html');

  win.on('closed', () => {
    win = null
  })

// 'win' as the BrowserWindow instance
win.on('resize', function () {
  setTimeout(function () {
    var size = win.getSize();
    win.setSize(size[0], parseInt(size[0] * 638 / 915));
  }, 0);
});

  // Prevent from spawning new windows
  win.webContents.on('new-window', (event, url) => {

    event.preventDefault()
    win.loadURL(url)
  })
}

// Executing the createWindow function
// when the app is ready
app.on('ready', createWindow)
