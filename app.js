class ProductManager {
    constructor() {
        this.productos = [];
        this.siguienteId = 1;
    }

    addProduct(title, descripcion, precio, miniatura, codigo, stock) {
        if (!title || !descripcion || !precio || !miniatura || !codigo || !stock) {
            throw new Error('faltan Datos');
        }

        if (this.productos.some(producto => producto.codigo === codigo)) {
            throw new Error('Ya existe un producto con ese codigo');
        }

        const nuevoProducto = {
            id: this.siguienteId++,
            title,
            descripcion,
            precio,
            miniatura,
            codigo,
            stock
        };

        this.productos.push(nuevoProducto);
        return nuevoProducto;
    }

    getProducts() {
        return this.productos;
    }

    getProductById(id) {
        const producto = this.productos.find(producto => producto.id === id);
        if (!producto) {
            throw new Error('Not found');
        }
        return producto;
    }
}

 // reviso que funcione...
const administradorProductos = new ProductManager();

try {
    console.log(administradorProductos.getProducts());

    administradorProductos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

     console.log(administradorProductos.getProducts());
    
    /* administradorProductos.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25); */

    const idProducto = 4; 
    console.log(administradorProductos.getProductById(idProducto));
} catch (error) {
    console.error(error.message);
}