<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name:"app",
  created(){
    if(sessionStorage.getItem('elemToken')){
      // 解析token
      try{
        const decode = jwt_decode(sessionStorage.getItem('elemToken'));
        this.$store.dispatch("setAuthetioned", !this.isEmpty(decode));
        this.$store.dispatch("setUser", decode);
      }catch(e){
        sessionStorage.removeItem('elemToken');
        this.$message.error('token解析异常请重新登录');
        this.$router.push({path:'/login'});
      }
    }
  },
  methods:{
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

<style lang="less">
body,html,
#app {
  width:100%;
  height:100%;
}
</style>
