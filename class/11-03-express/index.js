import express from "express";

const app = express();

// 상품 구매 api
app.post("/products/buy", (req, res) => {
  // 1. 가진 돈을 검증 (대략 10줄)
  // ...
  // ...
  // ...
  // ...
  // 2. 판매여부 검증 (대략 10줄)
  // ...
  // ...
  // ...
  // ...
  // 3. 상품구매
  // if(돈있음 && 상품구매안됨){
  //   res.send("구매 완료!")
  // }
});

// 상품 환불 api
app.post("/products/refund", (req, res) => {
  // 1. 판매여부 검증 (대략 10줄) => 기존에 만들어 놓았던 것 재사용
  // ...
  // ...
  // ...
  // ...
  // 2. 상품환불
  // if (판매완료) {
  //   res.send("환불 완료!");
  // }
});

app.listen(3000, () => {});
