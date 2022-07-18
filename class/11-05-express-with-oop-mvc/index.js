import express from "express";
import { ProdcutController } from "./mvc/controllers/product.controller.js";

const app = express();

// 상품 api
const productController = new ProdcutController();
app.post("/products/buy", productController.buyProduct); // 상품 구매 api
app.post("/products/refund", productController.refundProduct); // 상품 환불 api

app.listen(3000, () => {});
