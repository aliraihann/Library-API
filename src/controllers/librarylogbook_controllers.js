import { borrowABook, returnedBook, updateStatusReturnedBook, penalizedMemberStatus, getBorrowedBookByCode } from "../models/librarylogbook_models.js";
import { getBookByCode } from "../models/books_models.js";

const borrowBook = async (req, res) => {
    const {book_code, member_code, borrowed_date} = req.body;
    try {
        if (!book_code) {
            res.status(400).send("Please insert the book's code");
        }
        if (book_code.length > 2) {
            res.status(400).send('You are only allowed to borrow maxium 2 books')
        }
        const unavailableBooks = [];
        for (let i = 0; i < book_code.length; i++) {
            const book = await getBookByCode(book_code[i]);
            if (book.status === "on member") {
                unavailableBooks.push(book_code[i]);
            }
        }
        if (unavailableBooks.length > 0) {
            return res.status(400).send(`The following books are currently unavailable: ${unavailableBooks.join(', ')}`);
        }
        const inputDate = new Date(borrowed_date);
        const inputDateClone = new Date(inputDate.getTime()); // Clone the inputDate
        const dueDateTimeStamp = inputDateClone.setDate(inputDateClone.getDate() + 7);
        const dueDate = new Date(dueDateTimeStamp);

        let borrowCode = [];
        for (let i = 0 ;  i < book_code.length ; i++) {
            const borrowedBook = await borrowABook(book_code[i], member_code, inputDate, dueDate);
            borrowCode.push(borrowedBook)
        }
        res.status(200).send(`Here is your borrow code: ${borrowCode}. Please bring this receipt when returning the book and ensure its return within 7 days. Penalties may apply for returns after the due date.`) 
    } catch (err) {
        res.status(500).send(`error: ${err.message}`);
    }
};

const returnBook = async (req, res) => {
    const {member_code, borrow_code, book_code, returned_date} = req.body;
    try {
        for (let i = 0 ;  i < borrow_code.length ; i++) {
            const bookReturn = await returnedBook(returned_date, borrow_code[i]);
        }
        for (let i = 0 ;  i < book_code.length ; i++) {
            const updateStatus = await updateStatusReturnedBook(book_code[i]);
        }
        
        let penalized = false;
        for (let i = 0; i < borrow_code.length; i++) {
            const book = await getBorrowedBookByCode(borrow_code[i]);
            const dueDate = book.due_date;
            const newDueDate = new Date (dueDate);
            const returnedDate = new Date(returned_date);        
            if (newDueDate < returnedDate) {
                console.log('Penalty Condition Met');
                penalized = true;
            }
        }
        if (penalized) {
            const penaltyDate = new Date(returned_date);
            penaltyDate.setDate(penaltyDate.getDate() + 3);
            const penalizeMember = await penalizedMemberStatus(penaltyDate, member_code)
            res.status(200).send('Thank you for returning the book. Since it is past the due date, you will be unable to borrow a book for the next 3 days starting from today');
        }
        res.status(200).send('Thank you for returning the book on time, we look forward to the next chapter of your reading journey with us. Until then, happy reading')
    } catch (err) {
        res.status(500).send(`error: ${err.message}`);
    }
}


export {borrowBook, returnBook};