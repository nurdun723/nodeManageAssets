import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const type = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER' // 用户信息
}

const state = {// 需要维护的状态
  isAutnenticated: false,  // 是否认证
  user: {}   // 存储用户信息
}

const getters = {
  isAutnenticated:state => state.isAutnenticated,
  user:state =>state.user
}

const mutations = {
  [type.SET_IS_AUTNENTIATED](state,isAuthetioned){
    if(isAuthetioned){
      state.isAutnenticated = isAuthetioned
    }else{
      state.isAutnenticated = false
    }
  },
  [type.SET_USER](state,userdata){
    if(userdata) 
      state.user = userdata
    else 
      state.user = {}
  }
}

const actions = {
  setAuthetioned:({commit},isAuthetioned)=>{
     commit(type.SET_IS_AUTNENTIATED,isAuthetioned)
  },
  setUser:({commit},userdata)=>{
    commit(type.SET_USER,userdata)
  },
  clearCurrentState:({commit})=>{
    commit(type.SET_IS_AUTNENTIATED,false),
    commit(type.SET_USER,null);
  }
}

export default new Vuex.Store({
 state,
 getters,
 mutations,
 actions
})
