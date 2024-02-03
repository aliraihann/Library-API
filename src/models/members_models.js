// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const memberSchema = new Schema({
//     code: {type: String, required: true},
//     name: {type: String, required: true}
// })

// const member = mongoose.mo

import dbPool from "../config/mySQL_connection.js";


async function getMemberbyCode(code) {
    try {
        const [member] = dbPool.query(`
        SELECT * FROM members
        WHERE code = ?
        `,[code]);
        return member[0];
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

async function createMember(code, name) {
    try {
        const [member] = await dbPool.query(`
        INSERT INTO members(code, name)
        VALUES (?,?)      
        `, [code, name])
        return ('Member succesfully registered')
    } catch (err) {
        return (`error: ${err.message}`);
    }
};

async function getAllMember() {
    try {
        const [memberList] = await dbPool.query(`
        SELECT * FROM members       
        `)
        return memberList;
    } catch (err) {
        return (`error: ${err.message}`);
    }
}

async function getMemberBook() {
    try {
        const [memberList] = dbPool.query(`
        SELECT code, name, borrowed_books
        FROM members       
        `);
        return memberList[0];
    } catch (err) {
        return (`error: ${err.message}`);
    }
}


export {getMemberbyCode, createMember, getAllMember, getMemberBook};
