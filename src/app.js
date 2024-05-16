import express from "express";
import router from "./routes/index.router.js";

const app = express()
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`)
})