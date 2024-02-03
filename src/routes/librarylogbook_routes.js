import { borrowBook, returnBook } from "../controllers/librarylogbook_controllers.js";
import { penaltyAuth } from "../middleware/penaltyAuth_middleware.js";
import express from 'express';

const router = express.Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          borrowRequest:
 *              type: object
 *              properties:
 *                  book_code:
 *                      type: array
 *                      items:
 *                          type: string
 *                  member_code:
 *                      type: string
 *                  borrowed_date:
 *                      type: string
 * 
 *          returnRequest:
 *              type: object
 *              properties:
 *                  borrow_code:
 *                      type: array
 *                      items:
 *                          type: integer
  *                  member_code:
 *                      type: string
 *                  book_code:
 *                      type: array
 *                      items:
 *                          type: string
 *                  returned_date:
 *                      type: string
 */
/**
 * @swagger
 * /logbook/borrow:
 *  post:
 *      summary: Member borrowing 1 or 2 books
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/borrowRequest'
 *      responses:
 *          200:
 *              description: member successfully borrow the book and received the borrow_code for each book
 * 
 * /logbook/return:
 *  post:
 *      summary: Member returning 1 or 2 books
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/returnRequest'
 *      responses:
 *          200:
 *              description: Member successfully returns the book, and a penalty notice is issued for each book returned past the due date (if any)
 * 
 */
router.post('/borrow', penaltyAuth , borrowBook);
router.post('/return', returnBook);

export default router;