import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", { ping: async () => "pong" });
