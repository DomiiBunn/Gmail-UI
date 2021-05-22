const {
    app,
    BrowserWindow
} = require('electron')

const autoUpdater = require("electron-updater");

app.on("ready", () => {
	autoUpdater.checkForUpdatesAndNotify();
});

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false
        }
    })

    win.loadURL('https://mail.google.com/')
    win.setMenuBarVisibility(false)
    win.webContents.on('new-window', function (e, url) {
        if (url.includes('mail.google.com')) {
            return
        } else {
            e.preventDefault();
            require('electron').shell.openExternal(url);
        }
    });
    win.maximize()
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})