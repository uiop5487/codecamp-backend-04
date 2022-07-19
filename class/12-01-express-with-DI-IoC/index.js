import express from "express";
import { BoardController } from "./mvc/controllers/board.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProdcutController } from "./mvc/controllers/product.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";

const app = express();

// 서비스 의존성들
const cashService = new CashService();
const productService = new ProductService(); // new 한번으로 모든곳에서 재사용 가능(싱글톤패턴)
const pointService = new PointService(); // 포인트 구매방식이 포인트결제로 변경 됨

// 상품 api
const productController = new ProdcutController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매 api
app.post("/products/refund", productController.refundProduct); // 상품 환불 api

// 쿠폰(상품권 관련) api
const couponController = new CouponController(cashService);
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰 구매하기

// 게시판 api
const boardController = new BoardController();
app.get("/boards", boardController.fetchBoards); // 게시판 목록 조회 api
app.post("/boards", boardController.createBoard); // 게시판 등록 api

app.listen(3000, () => {});
