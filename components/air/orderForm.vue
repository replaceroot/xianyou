<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" 
                v-for="(item, index) in users"
                :key="index">
                    <!-- 用户列表 -->
                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select"
                        v-model="users[index].username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select"
                        v-model="users[index].id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>
             <!-- 点击添加乘机人 -->
            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item"
                v-for="(item, index) in infoData.insurances"
                :key="index">
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×${item.id}  最高赔付${(item.compensation.indexOf('万') != -1 ? item.compensation : item.compensation+'元') } `" 
                    @change="handlelsurances(item)"
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // 如果要在teamplate模版中使用动态数据，就必须在data中进行声明
    data(){
      return {
        users:  [{
          username: '',
          id: '',
        }],    // 用户列表
        insurances: [],   // 保险id集合
        contactName: "",    // 联系人
        contactPhone: "",   // 联系电话
        invoice: false,    // 是否需要发票
        seat_xid: "",   // 座位id
        captcha: "",  // 手机验证码
        air: "",    // 航班id
        infoData: {
          insurances: [],
        },   // 后台接口返回回来的数据
      }
    },
  
    methods: {
        // 添加乘机人
        handleAddUsers(){
          this.users.push({username: '',
          id: '',})
        },
        
        // 移除乘机人
        handleDeleteUser(index){
          console.log(index)
          this.users.splice(index, 1);
        },
        
        // 发送手机验证码
        handleSendCaptcha(){
            if(!this.contactPhone){
              this.$alert("请输入手机号码", '提示', {
                type: "warning"
              })
              return;
            }
            
            this.$store.dispatch('user/sendCode', this.contactPhone).then(code=>{
              this.$alert(`模拟验证码为:${code}`,'提示', {
                type: 'success'
              })
            })
        },

        // 提交订单
        handleSubmit(){
            
        },
      
      // 拼接保险数据
        handlelsurances(item){
          
          if(this.insurances.indexOf(item.id) != -1){
            this.insurances.splice(this.insurances.indexOf(item.id), 1);
          }else {
            this.insurances.push(item.id);
          }
          console.log(this.insurances)
        }
    },

    mounted(){
      const {id, seat_xid} = this.$route.query;
      // 请求选中的机票的数据
      this.$axios({
        url: '/airs/' + id,
        params: {
          seat_xid,
        }
      }).then(res=>{
        console.log(res.data)
        const {data} = res;
        this.infoData = data;
      })
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>