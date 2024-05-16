import { Router } from "express";
import fs from "fs";

const router = Router()

let products = []

router.get("/", (req, res) => {
    res.status(200).json(products)
})

router.get("/:id", (req, res) => {

    const { id } = req.params
    const productId = parseInt(id, 10)
    const product = products.find(product  => product.id === productId)

    if(!product) {
        res.status(404).json({status: "Error", msg: "No se encontraron productos con el ID solicitado"})
    }

    res.status(200).json({status: "Success", payload: product})
})

router.post("/", (req, res) => {
    
    const product = req.body
    const { title, description, code, price, status, stock, category, thumbnails} = product

    const newProduct = {
        id : products.length + 1,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails : []
    }

    if(Object.values(newProduct).includes(undefined)) throw new Error("Todos los campos son obligatorios");

    products.push(newProduct)
    res.status(200).json({status: "Success", payload: newProduct})
})

router.put("/", (req, res) => {

})

router.delete("/:id", (req, res) => {

    const { id } = req.params
    const productId = parseInt(id, 10)
    const product = products.find(product  => product.id === productId)

    if(!product) {
        res.status(404).json({status: "Error", msg: "No se encontraron productos con el ID solicitado"})
    }

    const index = products.indexOf(product)

    if (index !== -1) {
        products.splice(index, 1);
    }

    res.status(200).json({status: "Success", msg: "Producto eliminado correctamente"})

})

export default router;