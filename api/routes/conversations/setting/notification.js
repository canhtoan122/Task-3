var express = require('express');
var router = express.Router();
let conversationSetting = require('./Model/conversationSetting');
let mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iris',
});

const util = require('util');
const query = util.promisify(connection.query).bind(connection);
let checkConversationId = async (conversationId) => {
  try {
    let conversationSettingArray = await query('SELECT * FROM conversationSetting');
    let result = conversationSettingArray.findIndex((item) => {
      return item.conversationId === conversationId;
    });
    if (result == -1) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}
let getConversationSetting = async (array) => {
  try {
    let conversationSettings = await query('SELECT * FROM conversationSetting');
    for (let i = 0; i < conversationSettings.length; i++) {
      array.push(conversationSettings);
    }
    return array;
  } catch (err) {
    console.log(err);
  }
}
let createConversationId = async (conversationSetting) => {
  try {
    let conversationSettings = await query('SELECT * FROM conversationSetting');
    let create = await query(`UPDATE conversationSetting 
    SET type = '${conversationSetting.type}', time= '${conversationSetting.time}', conversationId = '${conversationSetting.conversationId}'
    WHERE inviteId = ${conversationSettings[0].inviteId}`);
    return conversationSettings;
  } catch (err) {
    console.log(err);
  }
}
let updateConversationId = async (conversationSetting) => {
  try {
    let conversationSettings = await query(`UPDATE conversationSetting 
      SET type = '${conversationSetting.type}', time= '${conversationSetting.time}'
      WHERE conversationId = ${conversationSetting.conversationId};`);
    return conversationSettings;
  } catch (err) {
    console.log(err);
  }
}

router.put('/', async function (req, res, next) {
  let { conversationId, type, time } = req.body;
  let conversationSettings = new conversationSetting(conversationId, type, time);
  let conversationSettingsArray = [];
  if (await checkConversationId(conversationId)) {
    await updateConversationId(conversationSettings);
    conversationSettingArray = await getConversationSetting(conversationSettingsArray);
  } else {
    await createConversationId(conversationSettings);
    conversationSettingArray = await getConversationSetting(conversationSettingsArray);
  }
  res.json(conversationSettingArray);
});

module.exports = router;