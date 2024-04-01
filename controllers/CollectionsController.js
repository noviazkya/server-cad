import Collection from "../models/CollectionsModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getCollection = async (req, res) => {
  try {
    const response = await Collection.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const response = await Collection.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const createCollection = async (req, res) => {
  const { title, creator, date, description } = req.body;
  try {
    if (req.files === null)
      return res.status(400).json({ msg: "no file uploaded" });
    const file = req.files.inputFile;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", "jpeg"];

    if (!allowedType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({ msg: "invalid image" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "image must be less than 5MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    const newCollection = await Collection.create({
      title: title,
      creator: creator,
      date: date,
      description: description,
      image: fileName,
      url: url,
    });
    res.status(201).json({
      message: "collection has created",
      collection: newCollection,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const updateCollection = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    
    if (!collection) {
      return res.status(404).json({ msg: "Data not found" });
    }

    let fileName = collection.image;

    if (req.files && req.files.inputFile) {
      const file = req.files.inputFile;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = `${file.md5}${ext}`;

      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid image" });
      }

      if (fileSize > 2000000) {
        return res.status(422).json({ msg: "Images must be less than 2MB" });
      }

      const uploadPath = path.join(__dirname, "../public/images", fileName);

      // Ensure the directory exists
      if (!fs.existsSync(path.join(__dirname, "../public/images"))) {
        fs.mkdirSync(path.join(__dirname, "../public/images"));
      }

      // Move the new file
      await file.mv(uploadPath);

      // Delete the existing file only if it's different from the new one
      if (fileName !== collection.image) {
        const filepath = path.join(__dirname, "../public/images", collection.image);
        if (fs.existsSync(filepath)) {
          try {
            fs.unlinkSync(filepath);
            console.log(`File ${filepath} successfully deleted`);
          } catch (err) {
            console.error(`Failed to delete file ${filepath}: ${err}`);
          }
        } else {
          console.warn(`File ${filepath} not found`);
        }
      }
    }

    const { title, creator, date, description } = req.body;

    // Update collection
    await collection.update({
      title: title,
      creator: creator,
      date: date,
      description: description,
      image: fileName,
      url: `${req.protocol}://${req.get("host")}/images/${fileName}`,
    });

    res.status(200).json({
      message: "Collection updated", 
    });
  } catch (error) {
    res.status(501).json({ msg: error.message });
    console.log(error.message);
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });

    if (!collection) return res.status(404).json({ msg: "Data not found" });
      // Delete the existing file
      const filepath = path.join(__dirname, '../public/images', collection.image);
      if (fs.existsSync(filepath)) {
        try {
          fs.unlinkSync(filepath);
          console.log(`File ${filepath} successfully deleted`);
        } catch (err) {
          console.error(`Failed to delete file ${filepath}: ${err}`);
        }
      } else {
        console.warn(`File ${filepath} not found`);
      }

    // Hapus koleksi dari database
    await Collection.destroy({
      where: {
        id: collection.id,
      },
    });

    res.status(200).json({ msg: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error deleting collection:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

