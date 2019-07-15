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
  }
}
