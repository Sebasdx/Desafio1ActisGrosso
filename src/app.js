const express = require("express")
const app = express()
const ProductManager = require("./ProductManager");
app.use(express.urlencoded({ extended:true }));

const PORT = 8080

const productManager = new ProductManager("productos.json");

app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        const products = productManager.getProducts().slice(0, limit);
        res.json(products);
    } else {
        const allProducts = productManager.getProducts();
        res.json(allProducts);
    }
});

app.get("/products/:id", (req, res) => {
    const productInt = parseInt(req.params.id);
    const productsId = productManager.getProductById(productInt);
    res.send(productsId);
});





app.listen(PORT,() => {
    console.log("Listening on port 8080")
})

