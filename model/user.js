//定义集合（表）结构，
const mongooes = require('mongoose');

//mongoose 里面的schema 主要是用于创建数据，每一个schema映射到一个MongoDB的集合，并且定义该集合的结果
const Schema = mongooes.Schema;

//Schema里面的每一个键对应一个集合属性
const UserSchma = new Schema({
    name:{
        type:String,//类型
        required:true,//是否必须设置
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

//通过Schema创建一个user集合的模型，后来通过这个模型对这个集合进行增删改查
//https://www.jianshu.com/p/ff727bfcb92e
module.exports = User = mongooes.model('user',UserSchma);

