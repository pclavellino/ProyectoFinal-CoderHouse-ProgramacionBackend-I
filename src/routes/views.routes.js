import { Router } from "express";
import productManager from "../productManager.js";
import { io } from "../app.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit)
        res.render("home", { products, styles: "styles.css"} )
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
    
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realTimeProducts", {styles: "styles.css"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.post("/realtimeproducts", async (req, res) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        await productManager.addProduct({ title, description, price, code, stock, category })
        const products = await productManager.getProducts()
        io.emit("products", products)
        res.render("realTimeProducts", {styles: "styles.css"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.delete("/realtimeproducts", async (req, res) => {
    try {
        const { id } = req.body;
        await productManager.deleteProduct(Number(id))
        const products = await productManager.getProducts()
        io.emit("products", products)
        res.render("realTimeProducts", {styles: "styles.css"})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

export default router;