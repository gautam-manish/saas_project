import app from "./src/app";
import { envConfig } from "./src/config/config";

import "./src/database/connection"

function startServer() {
  const port = envConfig.portNumber
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();