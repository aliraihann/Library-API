import dbPool from "../config/mySQL_connection.js";

async function borrowABook (book_code, member_code, inputDate, dueDate) {
    try {
        const [result] = await dbPool.query(`
        INSERT INTO library_logbook (book_code, borrowed_by, borrowed_date, due_date)
        VALUES (?,?,?,?)
        `, [book_code, member_code, inputDate, dueDate]);
        const borrow_code = result.insertId;

        const updateBookStatus = await dbPool.query(`
        UPDATE books
        SET status = "on member"
        WHERE code = ?       
        `, [book_code]);
        return borrow_code;
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

async function getBorrowedBooks () {
    try {
        const [result] = await dbPool.query(`
        SELECT * FROM library_logbook        
        `)
        return result[0];
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

async function getBorrowedBookByCode (borrow_code) {
    try {
        const [result] = await dbPool.query(`
        SELECT * FROM library_logbook 
        WHERE borrow_code = ?       
        `, [borrow_code])
        return result[0];
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

async function returnedBook (returned_date, borrow_code) {
    try {
        const result = await dbPool.query(`
        UPDATE library_logbook
        SET returned_date = ?
        WHERE borrow_code = ?        
        `, [returned_date, borrow_code]);
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

async function updateStatusReturnedBook (book_code) {
    try {
        const updateBookStatus = await dbPool.query(`
        UPDATE books
        SET status = "in stock"
        WHERE code = ?      
        `, [book_code]);
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

async function penalizedMemberStatus (penalty_date, member_code) {
    try {
        const result = await dbPool.query(`
        UPDATE members
        SET status = "on penalty", penalty_date = ?
        WHERE code = ?
        `, [penalty_date, member_code]);
    } catch (err) {
        return (`error: ${err.message}`);
    }    
}



export { borrowABook, returnedBook, updateStatusReturnedBook, penalizedMemberStatus, getBorrowedBooks, getBorrowedBookByCode};
