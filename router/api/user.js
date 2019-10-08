const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');//加密插件
const jwt = require('jsonwebtoken');//生成tocken的插件
const toekenkey = require('../../config/urlconfigs').secreteKey
const passport = require('passport');
const User = require('../../model/user');

router.get('/test',(req,res)=>{
    res.json('hello node server')
})

//注册接口
router.post('/register',(req,res)=>{
    let reqParam = req.body;
    User.findOne({email:reqParam.email}).then(mongores=>{
        if(mongores){
            return res.
            json({
                status:400,
                msg:"账户已存在",
                data:""
            });
        }else{
            const userInfo = new User({
                name:reqParam.name,
                email:reqParam.email,
                password:reqParam.password,
                identity:reqParam.identity
            });
            //加密密码
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(userInfo.password, salt, (err, hash) => {
                  if (err){
                      res.status(500).json({msg:"server error"});
                  };
        
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
    console.log(req.body)

    //从数据库里查找此账号
    User.findOne({email}).then(findRes=>{
        if(!findRes){
            return res.json({
                status:404,
                msg:"此账号不存在",
                data:""
            });;
        }

        //匹配此账号的密码
        bcrypt.compare(password ,findRes.password).then(ismatch=>{
            if(ismatch){
                //jwt.sign('规则','加密名字','过期时间','箭头函数')
                //生成规则
                const rule = {id:findRes.id,name:findRes.name,email:findRes.email,identity:findRes.identity};
                //生成tocken
                jwt.sign(rule,toekenkey,{expiresIn:100},(err,tocken)=>{
                    if(err){
                        return res.status(500).json({"code":"500","msg":"服务端出错"});
                    }
                    res.json({"code":200,"msg":"登录成功","data":'Bearer ' + tocken});
                })
            }else{
                return res.json({"code":"400","msg":"密码有误"});
            }
        })

    })
})

//
router.get('/current',passport.authenticate('jwt',{session: false}),(req,res)=>{
    console.log(req)
    if(res){
        res.json({
            id:req.user.id,
            name:req.user.name,
            email:req.user.email,
            identity:req.user.identity
        })
    }
    
})

module.exports = router;