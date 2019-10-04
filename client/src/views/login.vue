<template>
  <div class="login">
      <section class="form_container">
            <div class="manage_tip">
                <span class="title">妮萨在线后台管理系统</span>
            </div>
            <!-- :model="registerModel" :rules="Registeruser" -->
            <el-form :model="loginParams"  ref="loginRef" :rules="Loginrules" label-width="100px" class="loginForm">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="loginParams.email" placeholder="请输入邮箱..."></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" >
                <el-input type="password" v-model="loginParams.password" placeholder="请输入密码..."></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginRef')">登录</el-button>
              </el-form-item>
              <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
      </section>
  </div>
</template>

<script>
import urlconfig from '../avatar.js'
import jwt_decode from 'jwt-decode'
export default {
    name:"register",
    data(){
      var validatePassword = (rule, value, callback) => {
        if (value !== this.regesterParams.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        loginParams:{
          email:'',
          password:'',
        },
        Loginrules:{
          email:[
           { required: true, message: '请输入邮箱地址', trigger: 'blur' },
           { type: 'email', required: true,message: '请输入正确的邮箱地址', trigger: 'blur' },
          ],
          password:[
            {
              required:true,
              message:"密码不能为空",
              trigger:"blur"
            },
            {
              min:6,
              max:10,
              message:"密码长度必须要6到10之间",
              trigger:"blur"
            }
          ],
        }
      }
    },
    methods:{
      submitForm(formName){
      
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dataobj = {
              email:this.loginParams.email,
              password:this.loginParams.password,
            }
            this.$axios.post('/api/users/login',dataobj).then(res=>{
              console.log(res);
              if(res.code == 200){
                this.$message({
                  message:'登录成功',
                  type: 'success',
                  duration:1500
                });
                const token = res.data
                sessionStorage.setItem('elemToken',token)
                //解析token
                const tokendecode = jwt_decode(token);

                //存储token
                this.$store.dispatch('setAuthetioned',!this.isEmpty(tokendecode))
                this.$store.dispatch('setUser',tokendecode)
                setTimeout(()=>{
                  this.$router.push({path:'/index'})
                },1600)
              }else{
                this.$message({
                  message:res['msg'],
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        isEmpty(value) {
            return (
                value === undefined ||
                value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
    }

}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.el-button--primary{
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>