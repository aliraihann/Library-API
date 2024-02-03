import dbPool from "../config/mySQL_connection.js";

async function getAllBook() {
    try {
        const [bookList] = await dbPool.query(`
        SELECT * FROM books       
        `)
        return bookList;
    } catch (err) {
        return (`error: ${err.message}`);
    }
};

async function getAvailableBook() {
    try {
        const [bookList] = await dbPool.query(`
        SELECT * FROM books
        WHERE status = "in stock"      
        `)
        return bookList;
    } catch (err) {
        return (`error: ${err.message}`);
    }
};

async function getBookByCode(code) {
    try {
        const [book] = await dbPool.query(`
        SELECT * FROM books
        WHERE code = ?        
        `, [code]);
        return book[0];
    } catch (err) {
        return (`error: ${err.message}`);
    }
};

async function insertBook(code, title, author, stock) {
    try {
        const insert = await dbPool.query(`
        INSERT INTO books(code, title, author, stock)
        VALUES (?, ?, ?, ?)
        `, [code, title, author, stock])
        return ("Book successfully added to library collection");
    } catch (err) {
        console.error(`Error inserting book: ${err.message}`);
        throw new Error(err.message);
    }
};

export {getAllBook, getAvailableBook, getBookByCode, insertBook};