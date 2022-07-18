import { CashService } from "./services/cash.js";
import { ProductService } from "./services/product.js";

export class ProdcutController {
  buyProduct = (req, res) => {
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
  };

  refundProduct = (req, res) => {
    // 1. 판매여부 검증 (대략 10줄 => 2줄)
    const product = new ProductService();
    const isSoldout = product.checkSoldout(req.body.soldout);
    // 2. 상품환불
    if (isSoldout) {
      res.send("환불 완료!");
    }
  };
}
