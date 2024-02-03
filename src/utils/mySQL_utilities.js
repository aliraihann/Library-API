import dbPool from "../config/mySQL_connection.js";

async function memberTable () {
    try {
        const members = await dbPool.query(`
        CREATE TABLE members(
            code VARCHAR(255) PRIMARY KEY NOT NULL,
            name VARCHAR(255) NOT NULL,
            status VARCHAR(50) DEFAULT 'eligible',
            penalty_date TEXT,
            borrowed_books INT DEFAULT 0
            ) 
        `);
    } catch (err) {
        console.log(`error: ${err.message}`);
        return (`error: ${err.message}`)
    }
};


async function bookTable () {
    try {
        const books = await dbPool.query(`
        CREATE TABLE books(
            code VARCHAR(255) UNIQUE PRIMARY KEY NOT NULL,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            stock INT NOT NULL,
            status VARCHAR(10) DEFAULT 'in stock'
            )
        `)
    } catch (err) {
        console.log(`error: ${err.message}`);
        return (`error: ${err.message}`)
    }
}

async function libraryLogBook () {
    try {
        const libraryLogBook = await dbPool.query(`
        CREATE TABLE library_logbook(
            borrow_code INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            book_code VARCHAR(255) NOT NULL,
            borrowed_by VARCHAR(5) NOT NULL,
            borrowed_date TEXT NOT NULL,
            due_date TEXT NOT NULL,
            returned_date TEXT
            )
        `)
    } catch (err) {
        console.log(`error: ${err.message}`);
        return (`error: ${err.message}`)
    }
}

async function checkMemberTable () {
    try {
        const result = await dbPool.query(`
            SELECT 1 FROM members LIMIT 1;
        `);
        return result.length > 0;
    } catch (err) {
        console.log(`error: ${err.message}`);
        return (false)
    }
}

async function checkBookTable () {
    try {
        const result = await dbPool.query(`
            SELECT 1 FROM books LIMIT 1;
        `);
        return result.length > 0;
    } catch (err) {
        console.log(`error: ${err.message}`);
        return (false)
    }
}

async function checkLogbookTable () {
    try {
        const result = await dbPool.query(`
            SELECT 1 FROM library_logbook LIMIT 1;
        `);
        return result.length > 0;
    } catch (err) {
        console.log(`error: ${err.message}`);
        return (false)
    }
}

export {memberTable, bookTable, libraryLogBook, checkMemberTable, checkBookTable, checkLogbookTable};