const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppData: () => ipcRenderer.invoke('get-app-data'),
  updateAppData: (data) => ipcRenderer.invoke('update-app-data', data)
});