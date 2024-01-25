import Admin from "../models/AdminModel.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Tidak ada token, otentikasi gagal' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {

    if (err) {
      return res.status(403).json({ msg: 'Token tidak valid' });
    }

    try {
      const admin = await Admin.findOne({ where: { id: decodedToken.adminId } });
      if (!admin) {
        return res.status(404).json({ msg: 'admin tidak ditemukan' });
      }

      req.adminId = admin.id;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
  });
};