import express from "express";
import { isAuth } from "../domain/services/auth.middleware";
import { orderService } from "../domain/services/order.service";
import { checkParams } from "../domain/services/checkParams.middleware";

export const orderRouter = express.Router();

orderRouter.get("/", isAuth, checkParams, orderService.getOrders);
orderRouter.get("/:id", isAuth, orderService.getOrderById);
orderRouter.get("/user/:id", isAuth, orderService.getOrdersByUser);
orderRouter.post("/", isAuth, orderService.createOrder);
orderRouter.delete("/:id", isAuth, orderService.deleteOrder);
orderRouter.put("/:id", isAuth, orderService.updateOrder);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: API for managing orders
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders
 *     tags: [Author]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *     responses:
 *       200:
 *         description: The list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Author'
 *                   pagination:
 *                     $ref: '#/components/schemas/Pagination'
 *       400:
 *         description: Invalid page or limit parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /order/name/{name}:
 *   get:
 *     summary: Get an order by name
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The order name
 *     responses:
 *       200:
 *         description: The order info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: The order was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The order was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The order was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Some parameters are missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: The order was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /order/login:
 *   post:
 *     summary: Login as an order
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /order/image-upload:
 *   post:
 *     summary: Upload a image for a order
 *     tags: [Author]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The file to upload.
 *       - in: formData
 *         name: orderId
 *         type: string
 *         description: The id of the order
 *     responses:
 *       200:
 *         description: The image was uploaded successfully
 *       404:
 *         description: The order was not found
 */
