/**
 * 判断对象是否为空对象
 */
 function isEmptyObject(data){
     return JSON.stringify(data) == "{}"
 }


 module.exports = {
    isEmptyObject
 }