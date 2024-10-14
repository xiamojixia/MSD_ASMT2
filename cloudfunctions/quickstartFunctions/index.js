const getOpenId = require('./getOpenId/index');
const getMiniProgramCode = require('./getMiniProgramCode/index');
const createCollection = require('./createCollection/index');
const selectRecord = require('./selectRecord/index');
const updateRecord = require('./updateRecord/index');
const sumRecord = require('./sumRecord/index');
const cloud = require('wx-server-sdk');
cloud.init({ env:'shool-1gus62rlb2e36ed3'})
 // 使用当前云环境


// 云函数入口函数
exports.main = async (event, context) => {
  const db=cloud.database();
  const wxContext = cloud.getWXContext();
  const data = await db.collection("login_users").get();
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    data: data,
  };
  
};
