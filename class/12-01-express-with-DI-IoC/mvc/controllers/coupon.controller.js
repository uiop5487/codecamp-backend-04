export class CouponController {
  constructor(moneyService) {
    this.moneyService = moneyService;
  }

  buyCoupon = (req, res) => {
    // 1. 가진돈 검증 코드
    // const cashService = new CashService();
    const hasCash = this.moneyService.checkValue();

    // 2. 쿠폰 구매
    if (hasCash) {
      res.send("쿠폰 구매 완료!");
    }
  };
}
