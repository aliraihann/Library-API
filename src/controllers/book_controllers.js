import { getAllBook, getAvailableBook, getBookByCode, insertBook } from "../models/books_models.js";

const addBook = async (req, res) => {
    const {code, title, author, stock} = req.body;
    try {
        const insert = await insertBook(code, title, author, stock);
        res.status(200).send(insert);
    } catch (err) {
        return (`error: ${err.message}`);
    }
};

const generalBookList = async (req, res) => {
    try {
        const bookList = await getAllBook();
        res.status(200).send(bookList);
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

const availableBookList = async (req, res) => {
    try {
        const bookList = await getAvailableBook();
        res.status(200).send(bookList);
    } catch (err) {
        return (`error: ${err.message}`);
    }
}


const bookListByCode = async (req, res) => {
    const {code} = req.body;
    try {
        const bookList = await getBookByCode(code);
        res.status(200).send(bookList);
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

export {addBook, generalBookList, availableBookList, bookListByCode}