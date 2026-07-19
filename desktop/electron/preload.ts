import { contextBridge,ipcRenderer } from "electron";contextBridge.exposeInMainWorld("flowSort",{saveFile:(name:string,data:ArrayBuffer)=>ipcRenderer.invoke("save-file",name,data)});
