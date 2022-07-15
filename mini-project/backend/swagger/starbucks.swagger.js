/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 커피 목록 불러오기
 *     tags: [Starbucks]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          _id:
 *                              type: string
 *                              example: 62d02ae4ecc46183c252557c
 *                          name:
 *                              type: string
 *                              example: 에스프레소 콘 파나
 *                          img:
 *                              type: string
 *                              example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg
 */
