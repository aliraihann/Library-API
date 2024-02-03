import { createMember, getMemberbyCode, getAllMember, getMemberBook} from "../models/members_models.js";

const registerMember = async (req, res) => {
    const {code, name} = req.body;
    try {
        const insertMember = await createMember(code, name);
        res.status(200).send(insertMember);
    } catch (err) {
        res.status(400).send(`error: ${err.message}`);
    }
};

const allMemberList = async (req, res) => {
    try {
        const memberList = await getAllMember();
        res.status(200).send(memberList);
    } catch (err) {
        res.status(400).send(`error: ${err.message}`);
    }
};

const memberbyCode = async (req, res) => {
    const {code} = req.body;
    try {
        const memberList = await getMemberbyCode(code);
        res.status(200).send(memberList);
    } catch (err) {
        res.status(400).send(`error: ${err.message}`);
    }
};

const memberByBook = async (req, res) => {
    try{
        const memberList = await getMemberBook();
        res.status(200).send(memberList);
    } catch (err) {
        res.status(400).send(`error: ${err.message}`);
    }
};

export {registerMember, allMemberList, memberByBook, memberbyCode}

