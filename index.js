const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

/**
 * 引入接口
 */
const users = require('./router/api/user');

//DB config 
const db = require('./config/urlconfigs').mongooseUrl;

/**
 * body-parser是express解析请求体用的中间件
 *      https://www.jianshu.com/p/cd3de110b4b6
 *  */ 
//解析json格式
app.use(bodyParser.json());
//application/x-www-form-urlencoded 解析文本格式
//extended: false：表示使用系统模块querystring来处理，也是官方推荐的
//extended: true：表示使用第三方模块qs来处理
app.use(bodyParser.urlencoded({extended:false}))

//连接数据库
mongoose.connect(db).then(()=>{console.log('连接数据库成功')}).catch(err=>{console.log(err)})

// passport 初始化
app.use(passport.initialize());
require('./config/passport')(passport);

//使用api
app.use("/api/users",users);



//process.env.PORT 读取当前环境下的port值
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('启动成功');
})