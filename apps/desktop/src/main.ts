import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db: Database.Database;

function initDb() {
  const userData = app.getPath("userData");
  const dbPath = path.join(userData, "mechanics.sqlite");
  db = new Database(dbPath);
  // Example table if empty
  db.exec(`CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT);`);
  const row = db.prepare("SELECT value FROM meta WHERE key='init'").get();
  if (!row) db.prepare("INSERT INTO meta (key,value) VALUES ('init','ok')").run();
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";
  if (process.env.VITE_DEV_SERVER_URL) {
    await win.loadURL(devUrl);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    const indexHtml = path.join(__dirname, "../../renderer/dist/index.html");
    await win.loadFile(indexHtml);
  }
}

app.whenReady().then(() => {
  initDb();
  ipcMain.handle("ping", async () => "pong from main");
  createWindow();
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
