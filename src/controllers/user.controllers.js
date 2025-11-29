import { pool } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    if (!fname || !lname || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All register fields are required !",
      });
    }

    const [existing] = await pool.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already registered",
      });
    }

    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM users");

    if (rows[0].total === 0) {
      await pool.query("ALTER TABLE users AUTO_INCREMENT = 1");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)`,
      [fname, lname, email, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Unable to create user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All login fields are required",
      });
    }

    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successfull",
      token,
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
