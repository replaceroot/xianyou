<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>

      <!-- 菜单 -->
      <!-- 当前路径如果匹配上链接的to属性的值,就会加上这个class: nuxt-link-exact-active -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">机票</nuxt-link>
      </el-row>

      <!-- 右侧登录注册 -->
      <div>
        <div v-if="false">
          <nuxt-link to="/user/login">登录注册</nuxt-link>
        </div>
        <div v-if="true">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
              replaceroot
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  box-shadow: 0 2px 2px #ddd;
}
.main {
  width: 1000px;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
}
.logo {
  margin-right: 20px;
  img {
    width: 156px;
    height: 42px;
    margin-top: 9px; /* (60-42)/2 */
  }
}

.navs {
  flex: 1; /* 占取所有的空余空间 */

  a {
    display: block; /* 行快默认有外边距 */
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box; /* 内减模式 */

    &:hover {
      color: #409eff;
      border-bottom: 5px #409eff solid;
    }
  }

  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}

.el-dropdown-link{
  img{
    width: 36px;
    height: 36px;
    vertical-align: middle;
    border-radius: 50%;
  }
}
</style>

