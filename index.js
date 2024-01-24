import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import FileUpload from "express-fileupload";

dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected...');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }

    // (async () => {
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

  app.listen(process.env.APP_PORT, () => {
        console.log('server up and running...')
  });