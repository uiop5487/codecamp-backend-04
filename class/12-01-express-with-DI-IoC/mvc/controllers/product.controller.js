export class ProdcutController {
  constructor(moneyService, productService) {
    this.moneyService = moneyService;
    this.productService = productService;
  }

  buyProduct = (req, res) => {
    // 1. 가진 돈을 검증 (대략 10줄 => 2줄)
    // const cash = new CashService();
    const hasCash = this.moneyService.checkValue();
    // 2. 판매여부 검증 (대략 10줄 => 2줄)
    // const product = new ProductService();
    const isSoldout = this.productService.checkSoldout();
    // 3. 상품구매
    // if (hasCash && !isSoldout) {
    //   res.send("구매 완료!");
    // }
  };

  refundProduct = (req, res) => {
    // 1. 판매여부 검증 (대략 10줄 => 2줄)
    // const product = new ProductService();
    const isSoldout = this.productService.checkSoldout(req.body.soldout);
    // 2. 상품환불
    if (isSoldout) {
      res.send("환불 완료!");
    }
  };
}
