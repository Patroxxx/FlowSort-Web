"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = require("node:path");
const promises_1 = require("node:fs/promises");
function createWindow() { const win = new electron_1.BrowserWindow({ width: 1280, height: 820, minWidth: 900, minHeight: 620, backgroundColor: "#0B1020", title: "FlowSort", webPreferences: { preload: (0, node_path_1.join)(__dirname, "preload.js"), contextIsolation: true, nodeIntegration: false } }); const dev = process.env.VITE_DEV_SERVER_URL; if (dev)
    void win.loadURL(dev);
else
    void win.loadFile((0, node_path_1.join)(__dirname, "../dist/index.html")); }
electron_1.ipcMain.handle("save-file", async (_e, name, data) => { const r = await electron_1.dialog.showSaveDialog({ defaultPath: name, filters: [{ name: "Excel", extensions: ["xlsx"] }] }); if (r.canceled || !r.filePath)
    return false; await (0, promises_1.writeFile)(r.filePath, Buffer.from(data)); return true; });
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", () => { if (process.platform !== "darwin")
    electron_1.app.quit(); });
electron_1.app.on("activate", () => { if (electron_1.BrowserWindow.getAllWindows().length === 0)
    createWindow(); });
