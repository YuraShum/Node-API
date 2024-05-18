import { createServer } from "./src/createServer.js";

createServer(process.env.MONGO_URL, process.env.PORT)
