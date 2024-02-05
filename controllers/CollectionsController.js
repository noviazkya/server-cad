import Collection from "../models/CollectionsModel.js";
import fs from "fs";
import path from "path";

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
    const file = req.files.file;
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
  const collection = await Collection.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!collection) return res.status(404).json({ msg: "data not found" });

  let fileName = "";

  if (req.files === null) {
    fileName = collection.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "invalid image" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "images must be less than 5MB" });

    const filepath = `./public/images/${collection.image}`;

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

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const { title, creator, date, description } = req.body;

  try {
    await Collection.update(
      {
        title: title,
        creator: creator,
        date: date,
        description: description,
        image: fileName,
        url: `${req.protocol}://${req.get("host")}/images/${fileName}`,
      },
      {
        where: {
          id: collection.id,
        },
      }
    );
    res.status(200).json({
      message: "collection updated", 
    });
  } catch (error) {
    res.status(501).json({ msg: error.message });
    console.log(error.message);
  }
};

export const deleteCollection = async (req, res) => {
  const collection = await Collection.findOne({
    where: {
      uuid: req.params.uuid,
    },            
  });

  if (!collection) return res.status(404).json({ msg: "data not found" });
  
  try {
    await Collection.destroy({
      where: {
        id: collection.id,
      },
    });

    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const imagePath = path.join(__dirname, `../public/images/${collection.image}`);

    // Periksa apakah file ada sebelum mencoba menghapusnya
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      res.status(201).json({
        message: "collection updated",
      });
    } else {
      res.status(404).json({
        message: "image not found",
      });
    }
  } catch (error) {
    res.status(501).json({ msg: error.message });
    console.log(error.message);
  }
};
