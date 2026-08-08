const db = require("../config/db");

async function getProducts() {
    const [rows] = await db.query(
        "SELECT * FROM products WHERE is_available = TRUE"
    );

    return rows;
}

module.exports = {
    getProducts
};