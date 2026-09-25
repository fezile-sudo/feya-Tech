const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register
const register = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    // Basic validation
    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "Name, email and password are required."
      });

    }


    // Check whether email already exists
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );


    if (existingUser.rows.length > 0) {

      return res.status(409).json({
        success: false,
        message: "Email already exists."
      });

    }


    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);


    // Create user
    const result = await pool.query(
      `
      INSERT INTO users
        (name, email, password_hash)
      VALUES
        ($1, $2, $3)
      RETURNING id, name, email, created_at
      `,
      [name, email, passwordHash]
    );


    const user = result.rows[0];


    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );


    res.status(201).json({
      success: true,
      message: "Registration successful.",
      user,
      token
    });


  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed."
    });

  }

};


// Login
const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });

    }


    // Find user
    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        created_at
      FROM users
      WHERE email = $1
      `,
      [email]
    );


    if (result.rows.length === 0) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });

    }


    const user = result.rows[0];


    // Compare password with hash
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );


    if (!passwordMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });

    }


    // Create JWT
    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );


    // Don't send password hash to React
    delete user.password_hash;


    res.json({
      success: true,
      message: "Login successful.",
      user,
      token
    });


  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Login failed."
    });

  }

};


module.exports = {
  register,
  login
};
