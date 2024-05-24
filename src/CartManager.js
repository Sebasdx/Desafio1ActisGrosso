import fs from "fs"
import { productManager } from "./app.js"


export class CartManager {
    constructor(path) {
        this.path = path
        this.carts = []
    }

    async getCarts() {
        try {
            const response = await fs.promises.readFile(this.path, "utf-8")
            const carts = JSON.parse(response)
            return carts
        } catch (error) {
            throw error
        }
    }

    async getProductsOfCartById(id) {
        try {
            const carts = await this.getCarts()
            const findedCart = carts.find(cart => cart.id === id)
            if (!findedCart) {
                throw new Error(`No se encontro carrito asociado al id: ${id}`)
            }
            return findedCart.products
        } catch (error) {
            throw error;
        }
    }

    async addCarts() {
        try {
            this.carts = await this.getCarts()
            const autoId = await this.getLastCartId()
            const newCart = {
                id: autoId,
                products: []
            }
            this.carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            return newCart

        } catch (error) {
            throw error
        }
    }

    async addProductsToCart(cartId, prodId) {
        
        try {
            this.carts = await this.getCarts()
            const findedCart = this.carts.find(cart => cart.id === cartId)
            if (!findedCart) {
                throw new Error(`No se encontro carrito asociado al id: ${cartId}`)
            }
            await productManager.getProductsById(prodId);
            const prodInCart = findedCart.products.find(prod => prod.ProductId === prodId)
            if (!prodInCart) {
                findedCart.products.push({
                    ProductId: prodId,
                    quantity: 1
                })
            } else {
                prodInCart.quantity++
            }


            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            return findedCart


        } catch (error) {
            throw error
        }


    }

    async removeCart(cartId, prodId) {
        try {
            this.carts = await this.getCarts()
            const findedCart = this.carts.find(cart => cart.id === cartId)
            if (!findedCart) {
                throw new Error(`No se encontro carrito asociado al id: ${id}`)
            }
            const cartProduct = findedCart.products.find(prod => prod.ProductId === prodId)
            if (!cartProduct) {
                throw new Error(`No se encontro al producto de id ${prodId}, en el carrito de id: ${cartId}`)
            }
            
            if (cartProduct.quantity > 1) {
                cartProduct.quantity--
            } else {
                const index = findedCart.products.indexOf(cartProduct)
                findedCart.products.splice(index, 1)
            }
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            return findedCart

        } catch (error) {
            throw error
        }
    }

    async updateProductInCart(cartId, prodId, updatedProductData) {
        try {
            this.carts = await this.getCarts();
            const findedCart = this.carts.find((cart) => cart.id === cartId);
            if (!findedCart) {
                throw new Error(`No se encontro el carrito con el ID: ${cartId}`);
            }

            const updatedProductIndex = findedCart.products.findIndex((prod) => prod.ProductId === prodId);
            if (updatedProductIndex === -1) {
                throw new Error(`No se encontr el producto con el ID: ${prodId} en el carrito`);
            }

            findedCart.products[updatedProductIndex] = {
                ...findedCart.products[updatedProductIndex],
                ...updatedProductData
            };

            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));

            return findedCart;
        } catch (error) {
            throw error;
        }
    }

    getLastCartId() {
        if (this.carts.length === 0) return 1
        const idGenerator = this.carts[this.carts.length - 1].id
        return idGenerator + 1
    }
}