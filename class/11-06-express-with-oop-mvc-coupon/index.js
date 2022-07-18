import express from "express";
import { BoardController } from "./mvc/controllers/board.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProdcutController } from "./mvc/controllers/product.controller.js";

const app = express();

// 게시판 api
const boardController = new BoardController();
app.get("/boards", boardController.fetchBoards); // 게시판 목록 조회 api
app.post("/boards", boardController.createBoard); // 게시판 등록 api

// 상품 api
const productController = new ProdcutController();
app.post("/products/buy", productController.buyProduct); // 상품 구매 api
app.post("/products/refund", productController.refundProduct); // 상품 환불 api

// 쿠폰(상품권 관련) api
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰 구매하기

app.listen(3000, () => {});
