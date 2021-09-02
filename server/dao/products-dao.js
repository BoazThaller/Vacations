let connection = require("./connection-wrapper")


async function getProducts() {
    let sql =
        `SELECT id, product_name as name, product_price as price, product_image as image from products`;

    let response = await connection.execute(sql);
    return response
}


async function addProduct(productData) {
    let sql =
        `INSERT INTO products (product_name, product_price, category_id, product_image)
        VALUES (?,?,?,?)`;
    let parameters = [productData.name, productData.price, productData.categoryId,productData.image]
    let response = await connection.executeWithParameters(sql, parameters);
    return response
}

async function deleteProduct(productId) {
    let sql =
        `delete from products where id = ?`;
    let parameters = [productId]
    let response = await connection.executeWithParameters(sql, parameters);
    return response
}

async function editProduct(product, productId) {
    const sql = `update products set product_price = ?, product_name = ?, category_id = ? where id = ?`;
    let parameters = [product.price, product.name, product.categoryId, productId];

    return await connection.executeWithParameters(sql, parameters);
}




module.exports = { getProducts , addProduct, deleteProduct, editProduct}