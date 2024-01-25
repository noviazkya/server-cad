import Admin from "../models/AdminModel.js";
import bcryptjs from "bcryptjs";

export const getAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll({
      attributes: ["id", "uuid", "username", "email"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        uuid: req.params.uuid,
      },
      attributes: ["id", "uuid", "username", "email"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const { username, email, password, confPassword } = req.body;
  const salt = await bcryptjs.genSalt();
  const hashPassword = await bcryptjs.hash(password, salt);

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "password dan konfirmasi password tidak cocok" });
  }

  try {
    await Admin.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ msg: "register berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  const { username, email, password, confPassword } = req.body;
  const salt = await bcryptjs.genSalt();
  const hashPassword = await bcryptjs.hash(password, salt);

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "password dan konfirmasi password tidak cocok" });
  }
  try {
    await Admin.update(
      {
        username: username,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: admin.id,
        },
      }
    );
    res.status(201).json({ msg: "update admin berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!admin) return res.status(404).json({ msg: "admin not found" });
  try {
    await Admin.destroy({
      where: {
        id: admin.id,
      },
    });
    res.status(200).json({ msg: "admin deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
    console.log(error);
  }
};
