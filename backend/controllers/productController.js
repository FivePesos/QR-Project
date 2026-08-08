const Product = require("../models/productModel");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.getProducts();

        res.status(200).json(products);
    } catch (err) {
        console.error("GET PRODUCTS ERROR:", err);

        res.status(500).json({
            message: err.message
        });
    }
};