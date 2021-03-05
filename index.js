const {
    app,
    BrowserWindow
} = require('electron')


function createWindow() {
    const win = new BrowserWindow({
        fullscreen: true,
        webPreferences: {
            nodeIntegration: false
        }
    })

    win.loadURL('https://mail.google.com/')
    win.setMenuBarVisibility(false)
    win.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });
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