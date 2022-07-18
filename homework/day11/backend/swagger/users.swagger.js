/**
 * @swagger
 * /users:
 *   get:
 *     summary: 유저 목록 불러오기
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
 *                          _id:
 *                              type: string
 *                              example: 62d02ae4ecc46183c252557c
 *                          name:
 *                              type: string
 *                              example: 철수
 *                          email:
 *                              type: string
 *                              example: uiop5487@gmail.com
 *                          personal:
 *                              type: string
 *                              example: 123412-*******
 *                          prefer:
 *                              type: string
 *                              example: www.naver.com
 *                          pwd:
 *                              type: string
 *                              example: 1234
 *                          phone:
 *                              type: 01095605487
 *                          og:
 *                              type: object
 *                              properties:
 *                                title:
 *                                  type: string
 *                                  example: 네이버
 *                                description:
 *                                  type: string
 *                                  example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                                image:
 *                                  type: string
 *                                  example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 유저 등록하기
 *     tags: [Users]
 *
 *     requestBody:
 *       description: 유저 등록
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: 철수
 *                   email:
 *                     type: string
 *                     example: uiop5487@gmail.com
 *                   personal:
 *                     type: string
 *                     example: 111111-1111111
 *                   prefer:
 *                     type: string
 *                     example: www.naver.com
 *                   pwd:
 *                     type: string
 *                     example: 1234
 *                   phone:
 *                     type: string
 *                     example: 01095605487
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  _id:
 *                     type: string
 *                     example: 62d02ae4ecc46183c252557c
 */
