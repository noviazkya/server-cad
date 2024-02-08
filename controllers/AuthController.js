import Admin from "../models/AdminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (admin) => {
  const accessToken = jwt.sign(
    { adminId: admin.id, username: admin.username, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { adminId: admin.id, username: admin.username, email: admin.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // waktu kadaluwarsa refresh token dapat disesuaikan
  );

  return { accessToken, refreshToken };
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
    const role = admin.role;
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
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};
