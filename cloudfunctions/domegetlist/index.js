// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env:'shool-1gus62rlb2e36ed3'}) // 使用当前云环境
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  var num=event.num;
  var page=event.page;
  return await db.collection("domelist").skip(page).limit(num).get()
}