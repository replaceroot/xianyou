<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @changeDataList="changeDataList"></FlightsFilters>

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>

        <!-- 航班信息 -->
        <!-- 给FlightsItem子组件传一个data属性过去,属性的值就是后台返回的数据中的每一个对象 -->
        <FlightsItem v-for="(item, index) in dataList" :key="index" :data="item"></FlightsItem>

        <!-- 分页布局 -->
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <FlightsAside></FlightsAside>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  data() {
    return {
      flightsData: { flights: [], info: {}, options: {} }, // 后台返回的所有数据
      // dataList: [],  // 当前页数的数据
      pageIndex: 1, // 当前页数
      pageSize: 5, // 当前页面的条数
      total: 0, // 总条数
      cacheFlightsData: { flights: [], info: {}, options: {} }
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },

  computed: {
    // 当前页面渲染的数据列表
    dataList() {
      var result = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageSize * this.pageIndex
      );
      return result;
    }
  },

/*   watch: {
    // 监听路由的变化, 同一个页面之间的跳转不会重新加载组件
    // 1. 可以通过监听$route的方法来实现
    // 2.
    $route() {
      this.getData();
    }
  }, */

  beforeRouteUpdate(to, from, next){
    next();
    this.getData();
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 请求机票列表数据
      this.$axios({
        url: "airs",
        method: "GET",
        params: this.$route.query
      }).then(res => {
        // 大数据
        this.flightsData = res.data;

        // 和上面的值是一样的，只不过一旦被赋值之后就不能被修改了
        this.cacheFlightsData = { ...res.data };
        // console.log(this.cacheFlightsData,111);
        // 总条数
        this.total = res.data.total;
        // 第一页的数据
        // this.dataList = this.flightsData.flights.slice(0, this.pageSize);
        //   console.log(this.dataList);
      });
    },

    // 条数的切换
    handleSizeChange(value) {
      this.pageSize = value;
    },
    // 页数的切换
    handleCurrentChange(value) {
      // 把当前页码赋值给pageIndex
      this.pageIndex = value;
    },

    // 传递给子组件, 用于修改dataList
    changeDataList(arr) {
      this.flightsData.flights = arr;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>