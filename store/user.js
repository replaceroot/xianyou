// 每个小仓库都必须暴露出 state, mutations
export const state = ()=>{
  return {
    userInfo: {
      // 用户验证的token
      token: "",
      // 用户信息
      user: {
  
      }
      
    }
  }
}

// 同步修改仓库的数据
export const mutations = {
  // 设置用户信息
  setUserInfo(state, data){
    state.userInfo = data;
  },

  // 设置用户数据为空
  clearUserInfo(state){
    state.userInfo = {};
  }
}

// 异步修改仓库的数据
export const actions = {

  // 发送手机验证码
  sendCode(store, phoneNumber){
    return this.$axios({
      url: '/captchas',
      method: 'POST',
      data: {
        tel: phoneNumber
      }
    }).then(res=>{
      const {code} = res.data;
      return code;
    })
  },

  // 调用登录接口
  // login(store, data){
  login({commit}, data){
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data:data
    }).then(res => {
      // store.commit("setUserInfo", res.data)
      commit("setUserInfo", res.data)
      // 1.保存到vuex, 注意调用方法时加上命名空间,也就是方法所在的模块user

      // 登录后的行为应该由调用的页面去执行，不能写死，因为每个页面登录成功执行的操作可能不一样
      // this.$router.push("/");
      
    });
  },

  // 调用注册接口
  register({commit}, props){
    return this.$axios({
      url: '/accounts/register',
      method: "POST",
      data: props
    }).then(res=>{
      // 注册成功之后自动登录
      // 保存到vuex
      commit("setUserInfo", res.data);
    })
  }
  
}
