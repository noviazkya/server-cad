import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import FileUpload from "express-fileupload";
import db from "./config/Database.js";
import AdminRoute from "./routes/AdminRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CollectionRoute from "./routes/CollectionRoute.js";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }

  //   (async () => {
  //   await db.sync();
  //   console.log('Database synchronized...');
  // })();

  app.use(cors({
    origin: '',
    credentials: true,
  }));

  app.use(express.json());
  app.use(express.static("public"));
  app.use(FileUpload());
  app.use(cors());
  app.use(AdminRoute);
  app.use(AuthRoute);
  app.use(CollectionRoute);

  app.listen(process.env.APP_PORT, () => {
        console.log('server up and running...')
  });
