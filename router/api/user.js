const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');//加密插件

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

module.exports = router;