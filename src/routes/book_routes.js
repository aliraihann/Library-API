import { addBook, generalBookList, availableBookList, bookListByCode } from '../controllers/book_controllers.js'
import express from 'express';

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          insertBook:
 *              type: object
 *              properties:
 *                  code:
 *                      type: string
 *                  title:
 *                      type: string
 *                  author:
 *                      type: string
 *                  stock:
 *                      type: integer
 * 
 *          availableBookList:
 *              type: object
 *              properties:
 *                  code:
 *                      type: string
 *                  title:
 *                      type: string
 *                  author:
 *                      type: string
 *                  stock:
 *                      type: integer
 *                  status:
 *                      type: string
 */
/**
 * @swagger
 * /books/add:
 *  post:
 *      summary: Add a new book into the library's collection
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/insertBook'
 *      responses:
 *          200:
 *              description: Book successfully added to library collection
 * 
 * /books/available:
 *  get:
 *      summary: get list of book that currently available in the library's collection
 *      responses:
 *          200:
 *              description: Available book list
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/availableBookList'
 */
router.post('/add', addBook);
router.get('/available', availableBookList);

router.get('/list', generalBookList);
router.get('/code', bookListByCode);

export default router;