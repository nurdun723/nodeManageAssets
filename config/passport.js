const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('../model/user');
const keys = require('../config/urlconfigs');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//tocken 验证方法
opts.secretOrKey = keys.secreteKey;//tocken 名字
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      //console.log(jwt_payload);
      user.findById(jwt_payload.id).then(res=>{
        //console.log(res);
          if(res){
            return done(null,res)
          }else{
            return done(null,false);
          }
      })
    
    }));
}