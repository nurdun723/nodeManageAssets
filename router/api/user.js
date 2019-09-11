const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');//加密插件
const jwt = require('jsonwebtoken');//生成tocken的插件
const toekenkey = require('../../config/urlconfigs').secreteKey
const User = require('../../model/user');


//注册接口
router.post('/register',(req,res)=>{
    let reqParam = req.body;
    User.findOne({email:reqParam.email}).then(mongores=>{
        if(mongores){
            return res.status(400).json({"msg":"该账户已存在"});
        }else{
            const userInfo = new User({
                name:reqParam.name,
                email:reqParam.email,
                password:reqParam.password,
            });

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(userInfo.password, salt, (err, hash) => {
                  if (err) throw err;
        
                  userInfo.password = hash;
        
                  userInfo
                    .save()
                    .then(user => res.json(
                        {
                            status:200,
                            msg:"注册成功",
                            data:user
                        }
                    ))
                    .catch(err => res.json(
                        {
                            status:500,
                            msg:"server error",
                            data:""
                        }
                    ));
                });
            });

        }
    })
});

router.post('/login',(req,res)=>{
    //先获取参数
    let email = req.body.email;
    let password = req.body.password;

    //从数据库里查找此账号
    User.findOne({email}).then(findRes=>{
        if(!findRes){
            return res.status(404).json({"msg":"该账号不存在"});
        }

        //匹配此账号的密码
        bcrypt.compare(password ,findRes.password).then(ismatch=>{
            if(ismatch){
                //jwt.sign('规则','加密名字','过期时间','箭头函数')
                //生成规则
                const rule = {id:findRes.id,name:findRes.name,email:findRes.email};
                //生成tocken
                jwt.sign(rule,toekenkey,{expiresIn:3600},(err,tocken)=>{
                    if(err){
                        return res.status(500).json({"code":"500","msg":"服务端出错"});
                    }
                    res.json({"code":200,"msg":"登录成功","data":`nur723${tocken}`});
                })
            }else{
                return res.status(400).json({"code":"400","msg":"密码有误"});
            }
        })

    })
})

module.exports = router;