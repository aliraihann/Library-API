import { registerMember, allMemberList, memberByBook, memberbyCode } from "../controllers/member_controllers.js";
import express from 'express';

const router = express.Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          memberCreation:
 *              type: object
 *              properties:
 *                  code:
 *                      type: string
 *                  name:
 *                      type: string
 *          memberList:
 *              type: object
 *              properties:
 *                  code:
 *                      type: string
 *                  name:
 *                      type: string
 *                  status:
 *                      type: string
 *                  penalty_date:
 *                      type: string   
 *                  borrowed_books:
 *                      type: integer
 *                      description: Number of books currently borrowed by the member
 *      
 */

/**
 * @swagger
 * /members/create:
 *  post:
 *      summary: register new member
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/memberCreation'
 *      responses:
 *          200:
 *              description: member successfully registered
 * 
 * /members/list:
 *  get:
 *      summary: get member list
 *      responses:
 *          200:
 *              description: Member list
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/memberList'
 * 
 */
router.post('/create', registerMember);

router.get('/list', allMemberList);

router.get('/borrow_book', memberByBook);

router.get('/code', memberbyCode);

export default router;
