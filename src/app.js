import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { ProductManager } from './productManager.js';
import { CartManager } from './CartManager.js';

const PORT = 8080;
const app = express();
const path_Products = "src/data/products.json";
const path_Cart = "src/data/cart.json";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager(path_Products);
const cartManager = new CartManager(path_Cart);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
    console.log(`Online Server on port ${PORT}`);
});

export { app, productManager, cartManager };