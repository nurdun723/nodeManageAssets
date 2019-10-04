import axios from 'axios';
import { Loading,Message } from 'element-ui';
import router from './router'

let loading;
//开始加载
function startLoading(){
    loading = Loading.service({
        lock:true,
        message:"拼命加载中...",
        background:'rgba(0, 0, 0, 0.7)'
    });
}

//结束加载
function endloading(){
    loading.close();
}

//请求拦截
//请求发送拦截，把请求发送后台服务之前做什么....
axios.interceptors.request.use((config)=>{
    startLoading();
    if(sessionStorage.getItem('elemToken')){
        config.headers.Authorization = sessionStorage.getItem('elemToken')
    }
    return config
},(error)=>{
    endloading();
    Message.error('发送请求失败');
    return Promise.reject(error);
});

//响应拦截
//请求返回拦截，把后台服务返回的数据返回到页面之前做些什么...
axios.interceptors.response.use((dataconfig)=>{
    setTimeout(()=>{
        endloading();
    },1500)
    return dataconfig.data;
},(error)=>{
    const {status} = error.response;
    endloading();
    if(status == 401){
        Message.error('tocken 已过期请重新登录');
        sessionStorage.removeItem('elemToken')
        router.push({path:"/login"})
    }else{
        Message.error(error.response.data)
    }
    return Promise.reject(error);
});

export default axios;