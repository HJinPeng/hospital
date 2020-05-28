<template>
  <div class="smallhome">
      <div class="todayReservation">
          <!-- <p>今日预约</p> -->
          <el-table :data="order_list" style="width: 100%" stripe>
              <el-table-column prop="time" label="今日预约"> </el-table-column>
              <el-table-column prop="name" label="姓名" ></el-table-column>
              <el-table-column prop="phone" label="电话"></el-table-column>
              <el-table-column label="操作">
                  <template scope="scope">
                     <router-link to="/home/reservation/Mrliu">查看</router-link>
                  </template>
              </el-table-column>
          </el-table>
      </div>
      <div class="todayArrange">
          <p class="title">
            <span class="arr">今日排班</span>
            <router-link to="/home/arrange">
              <span class="more">更多</span>
            </router-link>
          </p>
          <div class="content">
            <div v-if="dataArrange_length == 0">
              <p style="color: #909399; font-size:14px; text-align:center; padding: 10px 0;">暂无数据</p>
            </div>
            <div v-else>
              <p v-if="" v-for="item in dataArrange" class="todayArrange-content">
                {{ item.doctorName}}：<br/>
                <span v-for="i in item.date" :key="i._id">【{{i.value}}】</span>
              </p>
            </div>
          </div>
      </div>

      <!-- <div class="echart">
          <p>上周看病人数统计</p>
          <div :style="{height:height,width:width}" ref="myEchart">
          </div>
      </div> -->
      <div class="news">
        <p>
          <span class="new">最新动态</span>
          <!-- <span class="more">更多</span> -->
        </p>
        <div class="content">
            <div class="article" v-for="item in articles" :key="item._id">
              <router-link tag="a" :to="`/article/${item._id}`" target="_blank">
                {{item.title}}<br/>
                <div style="text-align:right; font-size:8px;">【{{item.updatedAt}}】</div>
              </router-link>
            </div>
          
        </div>
      </div>
  </div>
</template>

 <script>
    import moment from 'moment';
    import echarts from 'echarts';
    // import store from '../../store';
    // import {api} from '../../global/api';
    export default {
      data() {
        return {
          articles:[],
          order_list:[],
          chart: null,
          dataArrange:[],
          dataArrange_length: 0
        }
      },
      mounted:function(){
        // this.$http.get(api.testData).then(function(response){
        //   console.log("首页的值response",response.data);
        //   this.tableData=response.data;
        // });

        //this.initChart();
        this.getArrange();
        this.getOrderList();
        this.getArticles();
      },

      // 图表部分
      // props接收父组件的数据
      props: {
        // 设置图表的宽度
        width: {
          type: String,
          default: '500px'
        },
        // 设置图表的高度
        height: {
          type: String,
          default: '500px'
        }
      },
      beforeDestroy() {
        if (!this.chart) {
          return
        }
        this.chart.dispose();
        this.chart = null;
      },
      methods: {
        // 获取文章
        getArticles(){
          this.$request.get('/article/list').then(res=>{
            console.log(res);
            const data = res.data;
            data.forEach((item)=>{
              item.updatedAt = item.updatedAt.slice(0,10)+' '+item.updatedAt.slice(11,19)
            })
            this.articles = data;
          })
        },

        // 今日预约
        getOrderList(){
          this.order_list = [];
          const hospital_id = this.$store.state.hospitalInfo._id;
          const doctor_id = 'all'
          const day = moment(new Date()).format('YYYY-MM-DD');
          this.$request.post('/order/list',{hospital_id,doctor_id,day}).then(res=>{
            // console.log(res);
            const data = res.data;
            for(let i = 0 ; i < data.length; i++) {
              let arrange_id = data[i]._id;
              let arrange_day = data[i].day;
              let doctor_id = data[i].doctor_id;
              let time = data[i].start_time + '~' + data[i].end_time;
              let orderList =  data[i].orderList;
              let patientInfo =  data[i].patientInfo;
              for(let j = 0 ; j < orderList.length ; j++) {
                let o = {};
                o.arrange_id = arrange_id;
                o.arrange_day = arrange_day;
                o.doctor_id = doctor_id;
                o.time = time;
                o.order_id = orderList[j]._id;
                o.patient_id = orderList[j].patient_id;
                o.status = orderList[j].status;
                const now = moment(new Date()).format('HH:mm');
                if(o.status == 1) {
                  o.status_value = '已完成'
                }else if(o.status == 0 && now <= data[i].end_time) {
                  o.status_value = '待就诊'
                }else {
                  o.status_value = '已过期'
                }
                
                o.buy_time = orderList[j].time;
                o.name = patientInfo[j].name;
                o.phone = patientInfo[j].phone;
                o.age = patientInfo[j].age;
                o.allergy = patientInfo[j].allergy;
                o.heart = patientInfo[j].heart;
                o.height = patientInfo[j].height;
                o.image = patientInfo[j].image;
                o.pressure = patientInfo[j].pressure;
                o.sex = patientInfo[j].sex;
                o.temperature = patientInfo[j].temperature;
                o.weight = patientInfo[j].weight;
                o.test_time = patientInfo[j].time;
                this.order_list.push(o);
              }
            }
            this.$message({
              type: 'success',
              message: '查询成功'
            })
            console.log('orderlist',this.order_list);
            // this.filterOrder();
          })
          // 调用过滤条件
          //this.show_order_list = [];
          
        },
        // ---------------------------------获取医生排班列表-------------
				getArrange(){
					const hospital_id = this.$store.state.hospitalInfo._id;
					const doctor_id = 'all';
	 				const day = new Date();
					//console.log(this.$moment(this.date).format('YYYY-MM-'));
					const date = this.$moment(day).format('YYYY-MM-DD')
					this.$request.post('/arrange/list',{hospital_id,doctor_id,date}).then(res=>{
            console.log(res.data);
            this.dataArrange = res.data[0].data;
            this.dataArrange_length = res.data[0].data.length;
					})
				},
        initChart() {
          // 对图表进行初始化
          this.chart = echarts.init(this.$refs.myEchart);
          // 把配置和数据放这里
          this.chart.setOption({
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                // 鼠标悬浮在柱上的效果
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            // 图表的位置
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              type: 'bar',
              barWidth: '60%',
              data: [50, 32, 100, 300, 190, 58, 350]
            }]
          })
        }
      }


    }
  </script>

<style type="text/css" scoped>
    .smallhome .todayReservation{
      margin-left:15px;
      /*text-align: center;*/
      float: left;
      width: 50%;
      height: 400px;
    }
    .smallhome .todayReservation p{
      font-size: 18px;
      line-height: 60px;
    }
    .smallhome .todayReservation a{
        text-decoration: none;
        color: #3398DB;
    }
    .smallhome .todayReservation a:hover,.smallhome .todayReservation a:active{
       color: red;
    }
    .smallhome .todayArrange{
      margin-left: 15px;
      border: 1px solid #dfe6ec;
      border-bottom: none;
      float: left;
      width: 30%;
      background: #fff;
    }
    .smallhome .todayArrange .title{
      line-height: 40px;
      background-color: #eef1f6;
    }
    .smallhome .todayArrange .title .arr,
    .smallhome .news .new{
      font-size: 14px;
      color:#1f2d3d;
      padding-left: 18px;
      padding-right: 18px;
      font-weight: bold;
    }
    .smallhome .todayArrange .title .more,
    .smallhome .news .more{
      font-size: 14px;
      color:#3398DB;
      padding-right: 30px;
      float: right;
    }
    .smallhome .todayArrange .content{
      height: auto;
    }
    .smallhome .todayArrange .todayArrange-content{
      line-height: 30px;
      padding-left: 18px;
      padding-right: 18px;
      font-size: 14px;
      color:#10181f;
      border-bottom: 1px solid #dfe6ec;
    }
    .smallhome .echart{
      clear: both;
      margin-left: 15px;
      background: #fff;
      width: 49.9%;
      overflow: hidden;
      border: 1px solid #dfe6ec;
      position: relative;
      top: 15px;
      float: left;
    }
    .smallhome .echart p{
      font-size: 14px;
      font-weight: bold;
      color:#1f2d3d;
      width: 100%;
      line-height: 40px;
      background-color: #eef1f6;
      padding-left: 15px;
    }
    .smallhome .news{
      float: left;
      margin-left: 15px;
      margin-top: 15px;
      margin-bottom: 20px;
      background: #fff;
      width: 30%;
      min-height: 200px;
      border: 1px solid #dfe6ec;
      border-bottom: none;
    }
    .smallhome .news p{
      line-height: 40px;
      background-color: #eef1f6;
    }
    .smallhome .news .more {
      cursor: pointer;
    }
    .smallhome .news .content .article {
      border-bottom: 1px solid #dfe6ec;
      font-size: 13px;
      padding: 8px 20px;
    }

    .smallhome .news .content .article a{
      color: #000;
      text-decoration: none;
    }

</style>