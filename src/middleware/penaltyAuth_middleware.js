import { getMemberbyCode } from "../models/members_models.js";

async function penaltyAuth (req, res, next) {
    const {member_code} =  req.body;
    try {
        const member = await getMemberbyCode(member_code);
        const checkStatus = member.status;

        if ( checkStatus === "on penalty") {
            const penaltyDate = member.penalty_date;
            res.status(400).send(`Your membership is currently penalized due to the lateness of book return. You will be eligible again after ${penaltyDate.toDateString()}.`)
        }
        next();
    } catch (err) {
        res.status(500).send(`error: ${err.message}`);
    }
}
export {penaltyAuth};