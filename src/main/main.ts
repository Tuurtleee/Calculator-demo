import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import Store from 'electron-store';


let mainWindow: BrowserWindow | null = null;

const store = new Store();
//Handling IPC here
ipcMain.on('ipc-calculator', async (event, arg) => {
  let formula = arg[0]
  formula
  formula = formula.replace('x','*').replace('÷','/').replace(/[^-()\d/*+%.]/g, ''); //sanitizing the formula
  let result = Function("'use strict'; return "+formula)() // NOT USING eval() due to security reasons
  console.log(`[DEBUG] Calculating ${formula} = ${result}`);
  event.sender.send('ipc-calculator',result);

  //saving history
  let history = store.get('history')
  console.log(history)
  if(history == undefined){
    console.log('[DEBUG] Initializing storage.')
    store.set("history",[{formula:formula,result:result}])
  }else{
    console.log("[DEBUG] Updating the history. ")
    store.set("history",[{formula:formula,result:result}].concat(history))
  }
});
ipcMain.on('ipc-history', async (event, arg) => {
  let history = store.get('history')
  event.sender.send('ipc-history',history);
});
ipcMain.on('ipc-change-bg-color', async (event, arg) => {
  let theme = store.get('theme')
  if(theme==undefined){
    store.set('theme','blue')
    event.sender.send('ipc-change-bg-color','blue')
  }
  if(arg[0]=="set"){//saving a new theme
  console.log(theme)
  store.set('theme',arg[1])
  event.sender.send('ipc-change-bg-color',arg[1])
  }else{//fetching the current theme infos
    event.sender.send('ipc-change-bg-color',store.get('theme'))
  }
});




if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 450,
    height: 725,
    resizable: false,
    autoHideMenuBar: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration:false,
      devTools: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
