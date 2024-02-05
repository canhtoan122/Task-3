let express = require('express');
let router = express.Router();
let User = require('../../../Models/user');
let { createToken } = require('./createToken');
let { insertUser } = require('../../../Database CRUD/user/create');
let { getAllUser } = require('../../../Database CRUD/user/read');
let jwt = require('jsonwebtoken');

router.post('/', async function (req, res, next) {
    try {
        let { name, username, email, password } = req.body;
        let user = new User(username, name, email, password);
        
        let token = await createToken(user);
        user["token"] = token;
        let users = await getAllUser();
        for(let i = 0; i < users.length; i++){
            let tempUser = jwt.decode(users[i].token);
            if(tempUser.name == name){
                res.end("Name already exist!");
                return;
            }else if(tempUser.username == name){
                res.end("Username already exist!");
                return;
            }else if(tempUser.email == email){
                res.end("Email already exist!");
                return;
            }
        }
        let decodedToken = jwt.decode(token);
        let expired_at = decodedToken && decodedToken.iat;
        user["expired_at"] = expired_at;
        insertUser(token, expired_at);
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
