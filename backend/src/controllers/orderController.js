const pool = require("../config/db");


// Create order
const createOrder = async (req, res) => {

  const client = await pool.connect();

  try {

    const userId = req.user.userId;

    const {
      customer_name,
      customer_email,
      phone,
      address,
      city,
      province,
      postal_code,
      country,
      payment_method,
      items
    } = req.body;


    if (!items || !Array.isArray(items) || items.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product."
      });

    }


    await client.query("BEGIN");


    let subtotal = 0;

    const orderItems = [];


    // Check products and stock
    for (const item of items) {

      const productResult = await client.query(
        `
        SELECT
          id,
          title,
          price,
          stock
        FROM products
        WHERE id = $1
        FOR UPDATE
        `,
        [item.product_id]
      );


      if (productResult.rows.length === 0) {

        throw new Error(
          `Product ${item.product_id} not found.`
        );

      }


      const product = productResult.rows[0];

      const quantity = Number(item.quantity);


      if (!Number.isInteger(quantity) || quantity <= 0) {

        throw new Error(
          `Invalid quantity for product ${product.id}.`
        );

      }


      if (product.stock < quantity) {

        throw new Error(
          `Insufficient stock for ${product.title}.`
        );

      }


      const price = Number(product.price);

      const itemTotal = price * quantity;

      subtotal += itemTotal;


      orderItems.push({
        product_id: product.id,
        quantity,
        price
      });

    }


    // VAT = 15%
    const vat = subtotal * 0.15;


    // Current shipping rule
    const shipping = 0;


    const total = subtotal + vat + shipping;


    const orderNumber =
      `ORD-${Date.now()}`;


    // Create order
    const orderResult = await client.query(
      `
      INSERT INTO orders (
        user_id,
        order_number,
        customer_name,
        customer_email,
        phone,
        address,
        city,
        province,
        postal_code,
        country,
        payment_method,
        subtotal,
        shipping,
        vat,
        total,
        status
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15,
        $16
      )
      RETURNING *;
      `,
      [
        userId,
        orderNumber,
        customer_name,
        customer_email,
        phone,
        address,
        city,
        province,
        postal_code,
        country,
        payment_method,
        subtotal,
        shipping,
        vat,
        total,
        "pending"
      ]
    );


    const order = orderResult.rows[0];


    // Create order items and reduce stock
    for (const item of orderItems) {

      await client.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES ($1, $2, $3, $4);
        `,
        [
          order.id,
          item.product_id,
          item.quantity,
          item.price
        ]
      );


      await client.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE id = $2;
        `,
        [
          item.quantity,
          item.product_id
        ]
      );

    }


    await client.query("COMMIT");


    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order
    });


  } catch (error) {

    await client.query("ROLLBACK");

    console.error(
      "CREATE ORDER ERROR:",
      error
    );


    res.status(500).json({
      success: false,
      message: error.message || "Failed to create order."
    });


  } finally {

    client.release();

  }

};



// Get user's orders
const getOrders = async (req, res) => {

  try {

    const userId = req.user.userId;


    const result = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );


    res.json({
      success: true,
      orders: result.rows
    });


  } catch (error) {

    console.error(
      "GET ORDERS ERROR:",
      error
    );


    res.status(500).json({
      success: false,
      message: "Failed to get orders."
    });

  }

};



// Get one user's order
const getOrderById = async (req, res) => {

  try {

    const userId = req.user.userId;

    const orderId = Number(req.params.id);


    if (!Number.isInteger(orderId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid order ID."
      });

    }


    const orderResult = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE id = $1
      AND user_id = $2
      `,
      [
        orderId,
        userId
      ]
    );


    if (orderResult.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Order not found."
      });

    }


    const order = orderResult.rows[0];


    const itemsResult = await pool.query(
      `
      SELECT
        order_items.id,
        order_items.product_id,
        order_items.quantity,
        order_items.price,
        products.title
      FROM order_items
      JOIN products
        ON order_items.product_id = products.id
      WHERE order_items.order_id = $1
      ORDER BY order_items.id
      `,
      [orderId]
    );


    res.json({
      success: true,
      order: {
        ...order,
        items: itemsResult.rows
      }
    });


  } catch (error) {

    console.error(
      "GET ORDER ERROR:",
      error
    );


    res.status(500).json({
      success: false,
      message: "Failed to get order."
    });

  }

};



module.exports = {
  createOrder,
  getOrders,
  getOrderById
};

