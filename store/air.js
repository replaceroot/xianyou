export const actions = {
  // 查询相关城市信息
  searchCity(store, data){
    return this.$axios({
      url: '/airs/city',
      method: 'GET',
      params: {
        // 搜索关键字
        name: data
      }
    })
  }
}