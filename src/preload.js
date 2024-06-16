// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer, clipboard } = require('electron');
const os = require('os'); 
const fs = require('fs');
const si = require('systeminformation');
const copy = require('copy-to-clipboard');
const uptime = os.uptime();

function getInfo(){
    valueObject = { 
        cpu: 'manufacturer, brand, speed',
        osInfo: 'platform, release, build, distro',
        system: 'model, manufacturer, serial',
        networkInterfaces: 'default, ifaceName, ip4',
        networkStats: 'operstate', 
        mem: 'total',
        memLayout: 'size, type, clockSpeed, formFactor, bank',
        diskLayout: 'type, vendor, size',
        fsSize: 'fs, used, size',
        battery: 'hasBattery, isCharging, maxcapacity, currentCapacity, acConnected, percent',
    }
    
   si.get(valueObject).then(data => {
        info = data;
        localStorage.setItem("sysInfo", JSON.stringify(info))
    });
};


contextBridge.exposeInMainWorld('bridge', {
    getInfo: getInfo(),
    hostname: os.hostname(),
    uptime: os.uptime(),
    copyText: (text) => clipboard.writeText(text),
    setReboot: (trigger, day, time) => setReboot(trigger, day, time),
    openBrowser: (url) => openBrowser(url)
})