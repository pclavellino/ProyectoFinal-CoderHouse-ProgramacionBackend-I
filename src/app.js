import express from "express";
import routes from "./routes/index.routes.js";
import viewRoutes from "./routes/views.routes.js"
import handlebars from "express-handlebars";
import productManager from "./productManager.js";
import { Server } from "socket.io";
import __dirname from "./dirname.js";

const app = express()
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`)
})

export const io = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewRoutes);
app.use("/api", routes);

io.on("connection", async (socket) => {
    console.log("Nuevo Cliente Conectado")
    const products = await productManager.getProducts()
    io.emit("products", products)
})