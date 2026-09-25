require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./config/db");

const productRoutes = require("./routes/productRoutes");

const authRoutes = require("./routes/authRoutes");

const orderRoutes = require("./routes/orderRoutes");


const app = express();


app.use(cors());

app.use(express.json());


app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);


app.get("/api/health", async (req, res) => {

  try {

    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "FeyaTech API is running",
      databaseTime: result.rows[0].now
    });

  } catch (error) {

    console.error(
      "DATABASE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });

  }

});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `FeyaTech API running on port ${PORT}`
  );

});

