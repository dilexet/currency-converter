import express from "express";
import cors from "cors";
import { PORT, HOSTNAME, BASE_URL } from "./src/constants/connection.constants.js";
import router from "./src/routes/index.js";
import errorHandlingMiddleware from "./src/middleware/error-handling-middleware.js";
import sequelize from "./db-config.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(BASE_URL, router);

app.use(errorHandlingMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, HOSTNAME, (err) => {
      if (err) {
        return console.error("Server error :(");
      }
      console.log(`Server listening on http://${HOSTNAME}:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();