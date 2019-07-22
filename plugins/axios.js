import { Message } from "element-ui";

// 当前nuxt的对象
export default ({$axios, redirect}) => {
  // 拦截axios的错误请求
  $axios.onError(err=>{
    // console.log(err.response.data);
    const {message, statusCode} = err.response.data;
    
    if(statusCode === 400){
      // 错误的警告信息
      Message.warning(message)
    }

    // 未授权
    if(statusCode === 401 || statusCode === 403){
      // 跳转到登录页
      redirect('/user/login');
    }
  })
};


