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
    if(req.body.cashe) profileobj.cashe = req.body.cash
    if(req.body.remark) profileobj.remark = req.body.remark

    new Profile(profileobj).save().then(profileres=>{
        if(profileres){
            res.json({"code":200,"msg":"资金添加成功","data":''});
        }else{
            res.json({"code":500,"msg":"资金添加失败","data":''});
        }
    })
});

module.exports = router;