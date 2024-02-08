import Information from "../models/InformationModel.js";
import Information_tags from "../models/Information_tagsModel.js";
import fs from "fs";
import path from "path";

export const getInformation = async (req, res) => {
  try {
    const response = await Information.findAll({
      include: [
        {
          model: Information_tags,
          attributes:[ "id","tags"]
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
          attributes:[ "id","tags"]
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createInformation = async (req, res) => {
  const { title, opening, category, date, description, address, tags } =
    req.body;

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

    file.mv(`../public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

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

    const filepath = `../public/images/${information.image}`;

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

    file.mv(`../public/images/${fileName}`, (err) => {
      if (err) {
        console.error(`Error moving file: ${err}`);
        return res.status(500).json({ msg: "Error moving file" });
      }
    });
  }

  const { title, opening, category, date, description, address } = req.body;

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
      where: {
        uuid: uuid,
      },
      include: [Information_tags], // Sertakan relasi dengan Information_tags
    });

    if (!information) {
      return res.status(404).json({ msg: "Information not found" });
    }

    // Panggil fungsi untuk menghapus semua tags
    await deleteInformationTags(information.id);

    // Hapus file gambar
    const imagePath = `../public/images/${information.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`File ${imagePath} successfully deleted`);
    } else {
      console.warn(`File ${imagePath} not found`);
    }

    // Hapus record informasi
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

export const addTagsForInformation = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { tags } = req.body;

    const information = await Information.findOne({
      where: { uuid },
    });

    if (!information) {
      return res.status(404).json({ msg: "Information not found" });
    }

    // Panggil fungsi untuk menambahkan tags baru
    await createInformationTags(information.id, tags);

    res.status(200).json({ msg: "Tags added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const updateTagsForInformation = async (req, res) => {
  const { uuid } = req.params;
  const { tags } = req.body;

  try {
    const information = await Information.findOne({
      where: { uuid },
    });

    if (!information) {
      return res.status(404).json({ msg: "Information not found" });
    }

    // Panggil fungsi untuk menghapus semua tags sebelum menambahkan yang baru
    await deleteInformationTags(information.id);

    // Panggil fungsi untuk menambahkan tags baru
    await createInformationTags(information.id, tags);

    // Pastikan objek res didefinisikan sebelum mencoba mengakses status
    res.status(200).json({ msg: "Tags updated successfully" });
  } catch (error) {
    console.error(error);
    // Pastikan objek res didefinisikan sebelum mencoba mengakses status
    res.status(500).json({ msg: error.message });
  }
};

export const deleteTagsForInformation = async (req, res) => {
  try {
    const information = await Information.findOne({
      where: { uuid: req.params.uuid },
    });

    if (!information) {
      return res.status(404).json({ msg: 'Information not found' });
    }

    // Panggil fungsi untuk menghapus semua tags
    await deleteInformationTags(information.id);

    res.status(200).json({ msg: 'Tags deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
