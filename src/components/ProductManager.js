const fs = require('fs')

class ProductManager {
    constructor() {
        this.path = "./productos.txt"
        this.products = []
    }
    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock,) => {
        ProductManager.id++
        let newProduct = { title, description, price, thumbnail, code, stock, id: ProductManager.id }
        this.products.push(newProduct)
        console.log(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    existe = async (id) => {
        let respuesta3 = await this.readProducts()
        return respuesta3.find((product) => product.id === id)
    }
    getProductById = async (id) => {
        let respuesta4 = await this.existe(id)
        return respuesta4 ? console.log(respuesta4) : console.log("Producto no encontrado")
    }

    deleteProductById = async (id) => {
        let respuesta5 = await this.readProducts()
        let productFilter = respuesta5.filter((products) => products.id != id)
        console.log(productFilter)
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter))
        console.log(`Producto con el ID ${id} eliminado`)
    }

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductById(id)
        let respuesta6 = await this.readProducts()
        let modifiedProducts = [{ ...producto, id }, ...respuesta6]
        await fs.promises.writeFile(this.path, JSON.stringify(modifiedProducts))
        console.log(modifiedProducts)
    }
}

const producto = new ProductManager()

/*producto.addProduct("titulo1", "esto es una descripcion", 1000, "imagen1", "abc123", 4)
producto.addProduct("titulo2", "esto es una descripcion", 2000, "imagen2", "abd124", 3)
producto.addProduct("titulo3", "description3", 2000, "imagen3", "abc126", 6)
producto.addProduct("titulo4", "description4", 2000, "imagen4", "abc125", 2)
producto.addProduct("titulo5", "esto es una descripcion", 1000, "imagen5", "code5", 4)
producto.addProduct("titulo6", "esto es una descripcion", 1000, "imagen6", "codigo6", 2)
producto.addProduct("titulo7", "esto es una descripcion", 3000, "imagen7", "code7", 90)
producto.addProduct("titulo8", "description8", 1000, "imagen8", "codigo8", 4)
producto.addProduct("titulo9", "decription9", 4000, "imagen9", "code9", 2)
producto.addProduct("titulo10", "description10", 1000, "imagen10", "code10", 10)*/
module.exports = new ProductManager()