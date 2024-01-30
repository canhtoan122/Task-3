var express = require('express');
var router = express.Router();
let mysql = require('mysql');
let { verifyToken } = require('../../../login/verifyToken');
let { createToken } = require('../../../signIn/createToken');
let jwt = require('jsonwebtoken');
// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iris',
});
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
let getUserId = async(id) =>{
    try{
        let users = await query(`SELECT * FROM user WHERE userId = ${id}`);
        return users;
    }catch(err){
        console.log(err);
    }
}
let updateUsers = async(userId, newToken, expired_at) => {
    try{
        let update = await query(`UPDATE user
        SET token = '${newToken}', expired_at = '${expired_at}'
        WHERE userId = ${userId}`);
        return update;
    }catch(err){
        console.log(err);
    }
}
router.put('/', async function (req, res, next) {
    const { conversationId, token, userId, role } = req.body;
    let user = await verifyToken(token);
    if(user.role != 1) {
        res.end("User role is not allow for this function.");
        return;
    }
    let users = await getUserId(userId);
    if(users.length === 0){
        res.end("UserId is not exist");
        return;
    }
    let newUser = await verifyToken(users[0].token);
    newUser.role = role;
    let newToken = await createToken(newUser);
    let decodedToken = jwt.decode(newToken);
    let expired_at = decodedToken && decodedToken.iat;
    let updateUser = await updateUsers(userId, newToken, expired_at);
    newUser.token = newToken;
    res.json(newUser);
});

module.exports = router;