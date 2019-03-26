// @ts-check

const { app, BrowserWindow } = require("electron");

const path = require("path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    if (process.env.ELECTRON_LOAD_URL) {
        mainWindow.loadURL(process.env.ELECTRON_LOAD_URL);
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
    }

    mainWindow.on("closed", function () {
        mainWindow = null
    })
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit()
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow()
    }
});
