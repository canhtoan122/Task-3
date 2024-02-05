var express = require('express');
var router = express.Router();
let User = require('../../../Models/user');
let { verifyToken } = require('./verifyToken');
let { getAllUser } = require('../../../Database CRUD/user/read');

let login = async(email, password) => {
    try{
        let tokens = [];
        let users = await getAllUser();
        for (let i = 0; i < users.length; i++) {
            let token = users[i].token;
            let result = await verifyToken(token);
            tokens.push(result);
        }
        console.log(tokens);
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].password == password && tokens[i].email == email) {
                return true;
            }
        }
        return false;
    }catch(err){
        console.log(err);
    }
}

router.post('/', async function (req, res, next) {
    try {
        let { email, password } = req.body;
        let check = await login(email, password);
        res.end(check.toString());
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
