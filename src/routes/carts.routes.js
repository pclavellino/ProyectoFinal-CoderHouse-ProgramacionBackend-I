import { Router } from "express";
import productManager from "../productManager.js";
import cartManager from "../cartManager.js";

const router = Router()

router.post("/", async (req, res) => {

    try {
        const cart = await cartManager.createCart()
        res.status(201).json({status: "Success", cart})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.get("/:cid", async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(Number(cid));
        if(!cart) return res.status(404).json({status:"Error", msg: "No se ha encontrado carrito con el ID especificado"})
        res.status(200).json({status: "Success", cart})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

router.post("/:cid/product/:pid", async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const product = await productManager.getProductById(Number(pid));
        if (!product) return res.status(404).json({status: "Error", msg: "No se ha encontrado producto con el ID especificado"})

        const cart = await cartManager.addProductToCart(Number(cid), Number(pid));
        if(!cart) return res.status(404).json({status:"Error", msg: "No se ha encontrado carrito con el ID especificado"})
            
        res.status(200).json({status: "Success", cart})

    } catch(error) {
        console.log(error)
        res.status(500).json({status: "Error", msg: "Error interno del servidor"})
    }
})

export default router;