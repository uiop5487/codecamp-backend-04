/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원 목록 조회
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: asdasd@gmail.com
 *                          name:
 *                              type: string
 *                              example: 철수
 *                          phone:
 *                              type: string
 *                              example: 010-1234-5678
 *                          personal:
 *                              type: string
 *                              example: 123456-1234567
 *                          prefer:
 *                              type: string
 *                              example: https://codecamp.com
 */
