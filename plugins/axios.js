import { Message } from "element-ui";

// 当前nuxt的对象
export default ({$axios}) => {
  // 拦截axios的错误请求
  $axios.onError(err=>{
    // console.log(err.response.data);
    const {message, statusCode} = err.response.data;
    
    if(statusCode === 400){
      // 错误的警告信息
      Message.warning(message)
    }
  })
};


