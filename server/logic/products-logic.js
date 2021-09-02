const productsDao = require("../dao/products-dao");


async function getProducts() {
    let response = await productsDao.getProducts();
    return response;
}

async function addProduct(productData) {
    await productsDao.addProduct(productData);
}

async function deleteProduct(productId) {
    await productsDao.deleteProduct(productId);
}


async function editProduct(product, productId) {
    await productsDao.editProduct(product, productId);
}



module.exports = { getProducts, addProduct, deleteProduct, editProduct}