import Admin from "../models/AdminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (admin) => {
  const accessToken = jwt.sign(
    { adminId: admin.id, username: admin.username, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const refreshToken = jwt.sign(
    { adminId: admin.id, username: admin.username, email: admin.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // waktu kadaluwarsa refresh token dapat disesuaikan
  );

  return { accessToken, refreshToken };
};

export const registerAdmin = async (req, res) => {
  const { username, email, password, confPassword } = req.body;

  // Check if password and confirmation password match
  if (password !== confPassword) {
    return res.status(400).json({ msg: 'Password and confirmation password do not match' });
  }

  try {
    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({
      where: {
        email: email,
      },
    });

    if (existingAdmin) {
      return res.status(400).json({ msg: 'Email is already registered' });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newAdmin = await Admin.create({
      username: username,
      email: email,
      password: hashPassword,
      role: "admin",
    });

    // Omit the password from the response
    const newAdminWithoutPassword = {
      id: newAdmin.id,
      username: newAdmin.username,
      email: newAdmin.email,
      role: newAdmin.role,
      // Add other attributes as needed
    };

    res.status(201).json({
      msg: "Register account successfully",
      newAdmin: newAdminWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const Login = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!admin) return res.status(404).json({ msg: "admin not found" });

    const match = await bcryptjs.compare(req.body.password, admin.password);

    if (!match) return res.status(400).json({ msg: "password wrong" });

    // jika otentikasi berhasil, buat token akses dan refresh token
    const { accessToken, refreshToken } = generateTokens(admin);

    // simpan refresh token di database
    admin.refreshToken = refreshToken;
    await admin.save();

    res.json({ success: true , accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

export const Me = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where:{
        id: req.adminId
      },
      attributes: [ "id", "uuid", "username", "email" ],
    });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};
