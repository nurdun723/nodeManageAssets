const express = require('express');
const router = express.Router();
const toekenkey = require('../../config/urlconfigs').secreteKey
const passport = require('passport');
const Profile = require('../../model/profile');

router.get('/testprofile',(req,res)=>{
    res.json('profile');
})

//添加资金信息
router.post('/addprofile',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const profileobj = {};
    if(req.body.type) profileobj.type = req.body.type
    if(req.body.discribe) profileobj.discribe = req.body.discribe
    if(req.body.incode) profileobj.incode = req.body.incode
    if(req.body.excripe) profileobj.excripe = req.body.excripe
    if(req.body.cash) profileobj.cash = req.body.cash
    if(req.body.remark) profileobj.remark = req.body.remark
    profileobj.date = new Date().getTime();

    new Profile(profileobj).save().then(profileres=>{
        if(profileres){
            res.json({"code":200,"msg":"资金添加成功","data":''});
        }else{
            res.json({"code":500,"msg":"资金添加失败","data":''});
        }
    })
});

//查询资金记录
router.post('/selecttallprofile',passport.authenticate('jwt',{session: false}),(req,res)=>{
    Profile.find().then((datas)=>{
        if(!datas){
            res.json({"code":500,"msg":"查询失败","data":""});
        }else{
            res.json({"code":200,"msg":"查询成功",data:datas});
        }
    })
})

//删除资金记录
router.post('/deleteprofilebyid',passport.authenticate('jwt',{session: false}),(req,res)=>{
    if(!req.body.id){
        res.json({"code":404,"msg":"记录id不能为空","data":""});
    }else{
        Profile.remove({_id:req.body.id}).then(err=>{
            console.log(err)
            if(err.n == 0){
                res.json({"code":500,"msg":"删除失败","data":""});
            }else if(err.n == 1){
                res.json({"code":200,"msg":"删除成功","data":""});
            }
        })
    }
})

module.exports = router;