const Order = require("../models/orderModel");

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.getOrders();

        res.status(200).json(orders);
    } catch (err) {
        console.error("GET ORDERS ERROR:", err);

        res.status(500).json({
            message: err.message
        });
    }
};


exports.createOrder = async (req, res) => {
    try {
        const { customer_name, items } = req.body;

        if (!customer_name || !items || items.length === 0) {
            return res.status(400).json({
                message: "Customer name and items are required"
            });
        }

        const order = await Order.createOrder(
            customer_name,
            items
        );

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (err) {
        console.error("CREATE ORDER ERROR:", err);

        res.status(500).json({
            message: err.message
        });
    }
};


exports.updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { payment_status } = req.body;

        await Order.updatePayment(id, payment_status);

        res.status(200).json({
            message: "Payment status updated"
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to update payment"
        });
    }
};