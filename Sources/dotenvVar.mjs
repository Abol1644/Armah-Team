import path from "path";
import dotenv from "dotenv";
import fs from "fs";

export function getit(){
const currentPath = path.join(__dirname);
const basePath = currentPath + "./server side/.env";
const envPath = basePath + "." + process.env.NODE_ENV;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;
const fileEnv = dotenv.config({ path: finalPath }).parsed;
const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});
}