<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from }:00-${item.to }:00`"
            :value="`${ item.from }, ${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in airSizeList"
            :key="index"
            :label="item.type"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizeList: [
        { type: "大", size: "L" },
        { type: "中", size: "M" },
        { type: "小", size: "S" }
      ]
    };
  },

  props: {
    // 传入大的对象
    data: {
      type: Object,
      default: {}
    }
  },

  /*  filters: {   该方法暂时不用
    // 修改时间，小于10的数字就加0
    changeTimes(num){
      if(num< 10){
        num = '0' + num;
      }
      return num;
    }
  }, */

  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      const arr = this.data.flights.filter(v => {
        return v.org_airport_name === value;
      });
      this.$emit("changeDataList", arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // 通过结构的方法拿到from,to的值
      const [from, to] = value.split(",");

      const arr = this.data.flights.filter(v => {
        const [start] = v.dep_time.split(":");
        return +from <= +start && +start < +to;
      });
      this.$emit("changeDataList", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // console.log(this.data, 11111);
      const arr = this.data.flights.filter(v => {
        // 遍历的每一项中的名字等于用户选择的值就返回到一个新的数组arr里面
        return v.airline_name === value;
      });
      // 只包含选中的航空公司的列表数组
      // 调用flights.vue组件传递过来的changeDataList方法,并把arr的值当作实参传递给父组件实现修改flightsData.flights的值
      this.$emit("changeDataList", arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      const arr = this.data.flights.filter(v => {
        return v.plane_size === value;
      });
      this.$emit("changeDataList", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      // 清空表单双向绑定输入框的内容
      this.airport =  ""; // 机场
      this.flightTimes =  ""; // 出发时间
      this.company =  ""; // 航空公司
      this.airSize =  ""; // 机型大小
      // 把原来完整的数据传给父组件重新渲染数据
      this.$emit("changeDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>