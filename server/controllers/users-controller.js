const usersLogic = require("../logic/users-logic");
const express = require("express");
const cors = require("cors");
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtLogic = require('../logic/jwt-logic');
const config = require('../config.json');



router.post("/login", async (request, response, next) => {
    // Extracting the JSON from the packet's BODY

    let user = request.body;
    try {
        // let successfullLoginData = await usersLogic.login(user);
        let userData = await usersLogic.login(user);
        response.json(userData);
    }
    catch (error) {
        return next(error);
    }
});

router.get('/login-check', jwtLogic.verifyToken , async (req, res) => {
    jwt.verify(req.token, config.secret, async (err, authData) => {
        if (err) {
            res.json(err);
        } else {
            res.json(authData);
        }
    });
});

router.post("/", async (request, response, next) => {
    try {
        let registrationData = request.body;
        await usersLogic.addUser(registrationData);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});


module.exports = router;
