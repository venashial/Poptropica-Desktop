require('v8-compile-cache');
const { app } = require('electron')
const path = require('path');
const RatioWindow = require('./RatioWindow');

// Global variable that holds the app window
let win

function createWindow() {

  // Creating the browser window
  win = new RatioWindow({
    width: 960,
    height: 640,
		backgroundColor: '#373B3D',
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true
    },
    title: "Poptropica",
    })


  win.loadURL('file://' + __dirname + '/app/index.html');

  win.on('closed', () => {
    win = null
  })

  win.on('show', () => {
    win.setSize(960, 640 + (win.getSize()[1] - win.getContentSize()[1]))
  })

  win.webContents.on('new-window', function(e, url) {
  e.preventDefault();
  require('electron').shell.openExternal(url);
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


// Discord Rich presence
const DiscordRPC = require('discord-rpc');

// Set this to your Client ID.
const clientId = '801212535767302165';

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !win) {
    return;
  }

  rpc.setActivity({
    details: 'Join the adventures',
    state: 'of Poptropica!',
    startTimestamp,
    largeImageKey: 'banner',
    largeImageText: 'Poptropica Desktop',
    smallImageKey: 'icon',
    smallImageText: 'https://github.com/venashial/Poptropica-Desktop',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);


// In main process.
const { ipcMain } = require('electron')

ipcMain.on('synchronous-message', (event, arg) => {
  event.returnValue = app.getVersion()
})
