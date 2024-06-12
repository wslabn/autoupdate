// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');
const os = require('os'); 
const fs = require('fs');
const si = require('systeminformation');
const copy = require('copy-to-clipboard');
const uptime = os.uptime();



contextBridge.exposeInMainWorld('bridge', {
    si: si,
    hostname: os.hostname(),
    uptime: os.uptime(),
    copyText: (text) => copyText(text),
    setReboot: (trigger, day, time) => setReboot(trigger, day, time),
    openBrowser: (url) => openBrowser(url)
})