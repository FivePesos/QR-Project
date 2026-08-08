const db = require("../config/db");

async function getOrders() {
    const [rows] = await db.query(`
        SELECT *
        FROM orders
        ORDER BY created_at DESC
    `);

    return rows;
}

async function updatePayment(orderId, paymentStatus) {
    await db.query(
        `UPDATE orders
         SET payment_status = ?
         WHERE order_id = ?`,
        [paymentStatus, orderId]
    );
}

async function createOrder(customerName, items) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const [products] = await connection.query(
                `SELECT product_id, product_price
                 FROM products
                 WHERE product_id = ?
                 AND is_available = TRUE`,
                [item.product_id]
            );

            if (products.length === 0) {
                throw new Error(
                    `Product ${item.product_id} not found or unavailable`
                );
            }

            const product = products[0];

            const subtotal =
                Number(product.product_price) * Number(item.quantity);

            totalAmount += subtotal;

            orderItems.push({
                product_id: product.product_id,
                quantity: item.quantity,
                price: product.product_price
            });
        }

        const [orderResult] = await connection.query(
            `INSERT INTO orders
             (customer_name, total_amount, payment_status)
             VALUES (?, ?, 'Pending')`,
            [customerName, totalAmount]
        );

        const orderId = orderResult.insertId;

        for (const item of orderItems) {
            await connection.query(
                `INSERT INTO order_items
                 (order_id, product_id, quantity, price)
                 VALUES (?, ?, ?, ?)`,
                [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price
                ]
            );
        }

        await connection.commit();

        return {
            order_id: orderId,
            customer_name: customerName,
            total_amount: totalAmount,
            payment_status: "Pending"
        };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    getOrders,
    updatePayment,
    createOrder
};