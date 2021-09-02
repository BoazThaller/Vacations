const productsLogic = require("../logic/products-logic");
const express = require("express");
const { request, response } = require("express");
const router = express.Router();

router.get("/", async (request, response, next) => {
    try {
        let productsData = await productsLogic.getProducts();
        response.json(productsData);
    }
    catch (error) {
        return next(error);
    }
});

router.post("/", async (request, response, next) => {
    try {
        let productData = request.body
        await productsLogic.addProduct(productData);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

router.delete("/:id", async (request, response, next) => {
    try {
        let productId = request.params.id
        await productsLogic.deleteProduct(productId);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});


router.put("/:id", async (request, response, next) => {
    try {
        let product = request.body;
        let productId = request.params.id;
        await productsLogic.editProduct(product, productId);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;