const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onTrackingUpdate: (callback) => ipcRenderer.on('os-tracker', callback)
})