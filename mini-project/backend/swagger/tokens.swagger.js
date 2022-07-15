/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 휴대폰 인증번호 발송
 *     tags: [Tokens]
 *
 *     requestBody:
 *       description: 유저 등록
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: 01095605487
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: string
 *                     example: 인증번호가 발송 되었습니다.
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 휴대폰 인증번호 확인
 *     tags: [Tokens]
 *     requestBody:
 *       description: 유저 등록
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: 01095605487
 *               token:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                     type: boolean
 *                     example: true
 */
