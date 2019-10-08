<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="8">
                <div class="user">
                    <img :src="userimage" class='avatar' alt="">
                </div>
            </el-col>
            <el-col :span="16">
                <div class="userinfo">
                  <div class="user-item">
                    <i class="fa fa-user"></i>
                   <span>{{user.name}}</span>
                  </div>
                  <div class="user-item">
                    <i class="fa fa-cog"></i>
                    <span>{{user.identity | identity}}</span>
                  </div>
               </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import imageurl from '../avatar.js'
export default {
  name: "userinfo",
  data(){
    return {
      userimage:imageurl.avatarturl
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  filters:{
    identity(type){
      if(type == "manager") 
        return '管理员'
      else if(type == "employee")
        return '员工'
    }
  }
};
</script>
<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
.user-item span{
    margin-left: 15px;
}
</style>