import express from "express";
import multer from "multer";
import { isAuth } from "../domain/services/auth.middleware";
import { authorService } from "../domain/services/author.service";
import { checkParams } from "../domain/services/checkParams.middleware";

const upload = multer({ dest: "public" });

export const authorRouter = express.Router();

authorRouter.get("/", checkParams, authorService.getAuthors);
authorRouter.get("/:id", authorService.getAuthorById);
authorRouter.get("/name/:name", authorService.getAuthorByName);
authorRouter.post("/", authorService.createAuthor);
authorRouter.delete("/:id", isAuth, authorService.deleteAuthor);
authorRouter.put("/:id", isAuth, authorService.updateAuthor);
authorRouter.post("/login", authorService.login);
authorRouter.post("/image-upload", isAuth, upload.single("image"), authorService.updateAuthorImage);

/**
 * @swagger
 * tags:
 *   name: Author
 *   description: API for managing authors
 */

/**
 * @swagger
 * /author:
 *   get:
 *     summary: Get all authors
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
 *         description: The list of authors
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
 * /author/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: The author info
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
 * /author/name/{name}:
 *   get:
 *     summary: Get an author by name
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The author name
 *     responses:
 *       200:
 *         description: The author info
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
 * /author:
 *   post:
 *     summary: Create a new author
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: The author was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */

/**
 * @swagger
 * /author/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     responses:
 *       200:
 *         description: The author was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /author/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The author was successfully updated
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
 *         description: The author was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /author/login:
 *   post:
 *     summary: Login as an author
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
 * /author/image-upload:
 *   post:
 *     summary: Upload a image for a author
 *     tags: [Author]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The file to upload.
 *       - in: formData
 *         name: authorId
 *         type: string
 *         description: The id of the author
 *     responses:
 *       200:
 *         description: The image was uploaded successfully
 *       404:
 *         description: The author was not found
 */
