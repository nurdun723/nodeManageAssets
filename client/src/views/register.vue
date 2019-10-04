<template>
  <div class="register">
      <section class="form_container">
            <div class="manage_tip">
                <span class="title">妮萨在线后台管理系统</span>
            </div>
            <!-- :model="registerModel" :rules="Registeruser" -->
            <el-form :model="regesterParams"  ref="regesterParams" :rules="Registeruser" label-width="100px" class="registerForm">
              <el-form-item label="用户名" prop="username" >
                <el-input v-model="regesterParams.username" placeholder="请输入用户名..."></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="regesterParams.email" placeholder="请输入邮箱..."></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" >
                <el-input type="password" v-model="regesterParams.password" placeholder="请输入密码..."></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmpassword" >
                <el-input  type="password" v-model="regesterParams.confirmpassword" placeholder="请确认密码.."></el-input>
              </el-form-item>
              <el-form-item label="选择身份">
                <el-select v-model="regesterParams.edintify" placeholder="请选择身份">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" @click="submitForm('regesterParams')">注册</el-button>
              </el-form-item>
            </el-form>
      </section>
  </div>
</template>

<script>
import urlconfig from '../avatar.js'
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
        regesterParams:{
          username:undefined,
          email:'',
          password:'',
          confirmpassword:undefined,
          edintify:undefined
        },
        options: [{
          value: 'manager',
          label: '管理员'
        }, {
          value: 'employee',
          label: '员工'
        }],
        Registeruser:{
          username:[
            {
              required:true,
              message:"用户名不能为空",
              trigger:"blur"
            },
            {
              min:6,
              max:12,
              message:"用户名长度必须要6和12之间",
              trigger:"blur"
            }
          ],
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
          confirmpassword:
          [
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
            },
            {
              validator:validatePassword,
              trigger:"blur"
            }
          ]
        }
      }
    },
    methods:{
      submitForm(formName){
      
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dataobj = {
              name:this.regesterParams.username,
              email:this.regesterParams.email,
              password:this.regesterParams.password,
              avatar:urlconfig.avatarturl,
              identity:this.regesterParams.edintify
            }
            this.$axios.post('/api/users/register',dataobj).then(res=>{
              console.log(res);
              if(res.status == 200){
                this.$message({
                  message:'注册成功',
                  type: 'success'
                });
                setTimeout(()=>{
                  this.$router.push({path:'/login'})
                },3000)
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
      }
    }

}
</script>

<style scoped>
.register {
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
  top: 10%;
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
.registerForm {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.el-button--primary{
  width: 100%;
  margin-top: 20px;
}
</style>