const express = require("express");
const server = express();
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");

const errorHandler = require("./errors/error-handler");


const cors = require('cors');
server.use(cors({ origin: "http://localhost:4200"}));


server.use(express.json());
server.use("/users", usersController);

server.use("/products", productsController);


server.use(errorHandler);
server.listen(3001, () => console.log("Listening on http://localhost:3001"));
