const express = require('express')
const ProductManager = require('./components/ProductManager')

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/ping", (req, res) => { res.send("pong") })
app.listen(3000, () => {
    console.log("aplicacion funcionando en el puerto 3000")
    async () => {
        let respuesta = await ProductManager.readProducts()
        console.log(respuesta)
    }
})
console.log("hola mundo")