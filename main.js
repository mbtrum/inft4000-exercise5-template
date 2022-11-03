const { app, BrowserWindow, ipc } = require('electron')
const path = require('path')
const os = require('os-utils')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')

    return win
}

app.whenReady().then(() => {
    const mainWindow = createWindow()

    mainWindow.webContents.once('dom-ready', () => {

        // Set a 2 second interval to get os info and send to renderer
        setInterval(() => {
            os.cpuUsage(function (n) {
                const tracker = {
                    cpu: n * 100,
                    mem: 100 - (os.freememPercentage() * 100)
                }
                
                mainWindow.webContents.send('os-tracker', tracker)
            })
        }, 2000)

    })


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
