const pool = require("../config/db");


// Get all products
const getProducts = async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        p.id,
        p.title,
        p.description,
        p.price,
        p.stock,
        p.image_url,
        c.name AS category
      FROM products p
      JOIN categories c
        ON p.category_id = c.id
      ORDER BY p.id;
    `);

    res.json(result.rows);

  } catch (error) {

    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    });

  }

};


// Get one product
const getProductById = async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(`
      SELECT
        p.id,
        p.title,
        p.description,
        p.price,
        p.stock,
        p.image_url,
        c.name AS category
      FROM products p
      JOIN categories c
        ON p.category_id = c.id
      WHERE p.id = $1;
    `, [id]);


    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    }


    res.json(result.rows[0]);

  } catch (error) {

    console.error("GET PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product"
    });

  }

};


module.exports = {
  getProducts,
  getProductById
};
