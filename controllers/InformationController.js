import Information from "../models/InformationModel.js";
import Information_tags from "../models/Information_tagsModel.js";
import fs from "fs";
import path from "path";
import { Op } from "sequelize";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const getInformation = async (req, res) => {
  try {
    const response = await Information.findAll({
      include: [
        {
          model: Information_tags,
          attributes: ["id", "tags"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getInformationById = async (req, res) => {
  try {
    const response = await Information.findOne({
      where: {
        uuid: req.params.uuid,
      },
      include: [
        {
          model: Information_tags,
          attributes: ["id", "tags"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createInformation = async (req, res) => {
  const { title, opening, category, date, description, address, tags } = req.body;

  try {
    if (!req.files || !req.files.inputFile) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.inputFile;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid image format" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "Image must be less than 5MB" });
    }

    const uploadDir = path.join(__dirname, '../public/images');

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Pengecekan apakah file dengan nama yang sama sudah ada di server
    const imagePath = path.join(uploadDir, fileName);
    if (fs.existsSync(imagePath)) {
      return res.status(409).json({ msg: "File with the same name already exists" });
    }

    file.mv(imagePath, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      const newInformation = await Information.create({
        title: title,
        opening: opening,
        category: category,
        date: date,
        description: description,
        address: address,
        image: fileName,
        url: url,
      });

      // Tambahkan tags baru
      await createInformationTags(newInformation.id, tags);

      res.status(201).json({
        message: "Information has been created",
        information: newInformation,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};


export const updateInformation = async (req, res) => {
  const information = await Information.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });

  if (!information) {
    return res.status(404).json({ msg: "Data not found" });
  }

  let fileName = "";

  if (!req.files || !req.files.inputFile) {
    fileName = information.image;
  } else {
    const file = req.files.inputFile;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid image format" });
    }

    if (fileSize > 2000000) {
      return res.status(422).json({ msg: "Image must be less than 2MB" });
    }


    const uploadPath = path.join(__dirname, "../public/images", fileName);

    // Ensure the directory exists
    if (!fs.existsSync(path.join(__dirname, "../public/images"))) {
      fs.mkdirSync(path.join(__dirname, "../public/images"));
    }

    // Move the new file
    await file.mv(uploadPath);

    // Delete the existing file only if it's different from the new one
    if (fileName !== information.image) {
      const filepath = path.join(__dirname, "../public/images", information.image);
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

  const { title, opening, category, date, description, address, tags } = req.body;

  try {
    await Information.update(
      {
        title: title,
        opening: opening,
        category: category,
        date: date,
        description: description,
        address: address,
        image: fileName,
        url: `${req.protocol}://${req.get("host")}/images/${fileName}`,
      },
      {
        where: {
          id: information.id,
        },
      }
    );

    // Update tags
    await updateInformationTags(information.id, tags);

    res.status(201).json({
      message: `Information ${information.title} has been updated`,
    });
  } catch (error) {
    res.status(501).json({ msg: error.message });
    console.error(error.message);
  }
};

export const deleteInformation = async (req, res) => {
  try {
    const { uuid } = req.params;

    const information = await Information.findOne({
      where: { uuid },
      include: [Information_tags], // Include relation with Information_tags
    });

    if (!information) {
      return res.status(404).json({ msg: "Information not found" });
    }

    // Delete all tags
    await deleteInformationTags(information.id);

    // Check if the image is used by other information
    const otherInformationUsingImage = await Information.findOne({
      where: { image: information.image, uuid: { [Op.not]: uuid } }, // Check if other information uses the same image
    });

    // Delete information record only if the image is not used by other information
    if (!otherInformationUsingImage) {
      // Delete image file
      const imagePath = `../public/images/${information.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log(`File ${imagePath} successfully deleted`);
      } else {
        console.warn(`File ${imagePath} not found`);
      }
    }

    // Delete information record
    await information.destroy();

    res.status(200).json({ msg: "Information and tags deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const createInformationTags = async (informationId, tags) => {
  try {
    const newInformationTags = await Information_tags.create({
      informationId,
      tags,
    });
    return newInformationTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateInformationTags = async (informationId, tags) => {
  try {
    // Delete existing tags
    await deleteInformationTags(informationId);
    // Create new tags
    await createInformationTags(informationId, tags);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteInformationTags = async (informationId) => {
  try {
    await Information_tags.destroy({
      where: { informationId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
