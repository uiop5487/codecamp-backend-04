import express from "express";
import { CashService } from "./cash.js";
import { ProductService } from "./product.js";

const app = express();

// 상품 구매 api
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈을 검증 (대략 10줄 => 2줄)
  const cash = new CashService();
  const hasCash = cash.checkValue(req.body.value);
  // 2. 판매여부 검증 (대략 10줄 => 2줄)
  const product = new ProductService();
  const isSoldout = product.checkSoldout(req.body.soldout);
  // 3. 상품구매
  if (hasCash && !isSoldout) {
    res.send("구매 완료!");
  }
});

// 상품 환불 api
app.post("/products/refund", (req, res) => {
  // 1. 판매여부 검증 (대략 10줄 => 2줄)
  const product = new ProductService();
  const isSoldout = product.checkSoldout(req.body.soldout);
  // 2. 상품환불
  if (isSoldout) {
    res.send("환불 완료!");
  }
});

app.listen(3000, () => {});
