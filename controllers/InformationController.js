import Information from "../models/InformationModel.js";
import Information_tags from "../models/Information_tagsModel.js";

export const getInformation = async (req, res) => {
  try {
    const response = await Information.findAll();
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
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createInformation = async (req, res) => {
  const { title, opening, category, date, description, address } = req.body;
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

    const newInformation = await Collection.create({
      title: title,
      opening: opening,
      category: category,
      date: date,
      description: description,
      address: address,
      image: fileName,
      url: url,
    });
    res.status(201).json({
      message: "information has created",
      Information: newInformation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const addTagsForInformation = async (req, res) => {
  const { uuid } = req.params;
  const { tags } = req.body;

  try {
    const information = await Information.findOne({
      where: { uuid },
    });

    if (!information) {
      return res.status(404).json({ msg: "information not found" });
    }

    await createInformationTags(information.id, tags);

    res.status(201).json({ msg: "tags added to information successfully" });
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

export const deleteTagsForInformation = async (req, res) => {
  const { uuid } = req.params;

  try {
    const information = await Information.findOne({
      where: { uuid },
    });

    if (!information) {
      return res.status(404).json({ msg: "information not found" });
    }

    // panggil fungsi deleteInformationTags untuk menghapus tags dari information
    await deleteInformationTags(information.id);

    res.status(200).json({ msg: "tags deleted from information successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const deleteInformationTags = async (informationId) => {
  try {
    await _tags.destroy({
      where: { informationId },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
