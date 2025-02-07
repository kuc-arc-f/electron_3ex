const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path')
const fs = require('fs');
const fsPromises = require('fs').promises;
const ogs = require('open-graph-scraper');
require('dotenv').config({ path: path.join(__dirname, '.env') });

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  })
  //handle
  ipcMain.handle('test-first-api', async (_e, _arg) => {
    console.log("#test-first-api");
    console.log("Arguments received:", _arg); // 引数を確認
    return "ret.test-first-api: " + _arg;
  });


  ipcMain.handle('get-externel-api', async (_e, path) => {
    //console.log("#test-first-api");
    const retObj = {ret: 500 , data: null};
    console.log("get-externel-api.url=", path); // 引数を確認
    try {
      const url = process.env.VITE_API_URL + path;
      const response = await fetch(url); // GETリクエストを送信
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const text = await response.text();
      console.log(text);
      retObj.ret = 200;
      retObj.data = text;
      return retObj;
    } catch (error) {
      console.error(error);
      console.error("エラーが発生しました:", error.message);
      return retObj;
    }
  });

  ipcMain.handle('post-externel-api', async (_e, path, item) => {
    const retObj = {ret: 500, data: null};
    console.log("post-externel-api.url=", path); // 引数を確認
    try {
      item.api_key = process.env.VITE_API_KEY;
      const body = JSON.stringify(item);	
      const url = process.env.VITE_API_URL + path;	
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await response.json()
      retObj.ret = 200;
      retObj.data = json;
      return retObj;
    } catch (error) {
      console.error(error);
      console.error("エラーが発生しました:", error.message);
      return retObj;
    }
  });

  // ファイルを読み取るIPCハンドラ
  ipcMain.handle('read-json-file', async (event, filePath) => {
    return new Promise((resolve, reject) => {
      const targetPath = path.join(__dirname, filePath);
      console.log("targetPath=", targetPath);
      fs.readFile(targetPath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });    
  });

  ipcMain.handle('get-template-file', async (event, filePath) => {
    try{
      const targetPath = path.join(__dirname, filePath);
      console.log("targetPath=", targetPath);
      // ファイルを非同期的に読み込む
      const fileBuffer = await fsPromises.readFile(targetPath);
      // Buffer を ArrayBuffer に変換
      const arrayBuffer = fileBuffer.buffer.slice(fileBuffer.byteOffset, fileBuffer.byteOffset + fileBuffer.byteLength);
      return arrayBuffer;
    }catch(e){
      console.error(e);
      return null;
    }
  });  

  ipcMain.handle('get-ogp-api', async (_e, path) => {
    const retObj = {ret: 500 , data: null};
    console.log("get-ogp-api.url=", path); // 引数を確認
    try {
      const options = { 
        url: path ,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      };
      const { result } = await ogs(options);
      console.log(result);
      retObj.ret = 200;
      retObj.data = result;
      return retObj;
    } catch (error) {
      console.error(error);
      console.error("エラーが発生しました:", error.message);
      return retObj;
    }
  });  

  ipcMain.handle('open-dialog-api', async (event, options) => {
    const result = await dialog.showMessageBox(options);
    return result;
  });

  win.loadFile('index.html');
  // Open the DevTools.
  //win.webContents.openDevTools();
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})