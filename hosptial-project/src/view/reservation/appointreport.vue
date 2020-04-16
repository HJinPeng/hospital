<template>
  <div class="appointreport" >
    <!-- 条件区域 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" fit>
      <el-form-item label="预约日期">
        <el-date-picker
          v-model="formInline.day"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="医生">
        <el-select v-model="formInline.doctor_id" placeholder="全部医生">
					<el-option key="all" label="全部医生" value="all">
					</el-option>
					<el-option v-for="item of doctor_options" :key="item._id" :label="item.name" :value="item._id">
					</el-option>
				</el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-search"@click="onSubmit"> 查询</el-button>
      </el-form-item> 
    </el-form>
  
  <div class="content">
    <el-table  :data="order_list.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"  style="width: 100%" stripe height="400">
      <el-table-column  prop="order_id" label="订单号" width='240'>
      </el-table-column>
      <el-table-column label="预约时间" width="220">
        <template slot-scope="scope">
          {{scope.row.arrange_day}} {{scope.row.time}}
        </template>
      </el-table-column>
      <el-table-column  prop="name" label="病人姓名"></el-table-column>
      <el-table-column  prop="phone" label="联系电话"></el-table-column>
      <el-table-column  prop="buy_time" label="下单时间" width="200"></el-table-column>
      <el-table-column  prop="status_value" label="状态"  :filters="[{ text: '待就诊', value: '待就诊' }, { text: '已过期', value: '已过期' }, { text: '已完成', value: '已完成' }]" :filter-method="filterStatus"></el-table-column>
    
      <el-table-column label="操作">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="searchName"
            size="mini"
            placeholder="输入姓名关键字"/>
        </template>
        <template scope="scope">
          <el-button size="small"  @click="handleEdit(scope.$index, scope.row)"> 编辑</el-button>
          <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button> 
        </template>
      </el-table-column>
    </el-table>
  </el-table>    
</div>
  
  <!-- 点击编辑出现的弹窗 -->
  <el-dialog title="修改预约信息" v-model="dialogFormVisible" size="tiny" >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="创建时间">
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="报备来源">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="有效期">
        <el-input v-model="form.indate"></el-input>
      </el-form-item>
      <el-form-item label="状态">
      <el-select v-model="form.usestate" placeholder="请选择">
        <el-option label="生效中" value="生效中"></el-option>
        <el-option label="已确认" value="已确认"></el-option>
        <el-option label="已过期" value="已过期"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="center">
        <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  
  <!-- 点击添加项目出现的弹窗 -->
  <el-dialog title="添加预约信息" v-model="dialogFormVisibleadd" size="tiny">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="创建时间">
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="报备来源">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="有效期">
        <el-input v-model="form.indate"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.usestate" placeholder="请选择">
        <el-option label="生效中" value="生效中"></el-option>
        <el-option label="已确认" value="已确认"></el-option>
        <el-option label="已过期" value="已过期"></el-option>
      </el-select>
      </el-form-item>
      <el-form-item class="center">
        <el-button type="primary" @click="handleSaveadd" :loading="editLoading">修改</el-button>
        <el-button @click="dialogFormVisibleadd = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  
  <!-- 分页 -->
  <div class="block">
     <el-pagination
       @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :current-page="currentPage1"
       :page-sizes="[10, 20, 30, 40]"
       :page-size="100"
       layout="total, sizes, prev, pager, next, jumper"
       :total="tableData.length">
     </el-pagination>
   </div>
   </div>
   </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'appointreport',
  data () {
    return {
      formInline: {
         day: '',
         doctor_id: 'all',
         patient_name: '',
         status:'',
      },
      doctor_options: this.$store.state.doctorList,
      order_list: [],
      searchName: '',

      dialogFormVisible:false,
      dialogFormVisibleadd:false,
      editLoading:false,//是否显示修改状态
      currentPage1: 5,
      activeIndex: '1',
      
       form: {
          time: '',
          name: '',
          phone:'',
          source:'',
          indate:'',
          usestate:'',
        },
      tableData: [{
                 
                 time: '2017-05-03',
                 name: '李1华',
                 phone:'13800138000',
                 source:'李笑笑',
                 indate:'20170503',
                 status:'已完成',
               }, 
               {
                 
                 time: '2017-05-03',
                 name: '李2华',
                 phone:'13800138000',
                 source:'李笑笑',
                 indate:'20170503',
                 status:'待就诊',
               },
               {
                 time: '2017-05-03',
                 name: '李3华',
                 phone:'13800138000',
                 source:'李笑笑',
                 indate:'20170503',
                 status:'待就诊',
               }, 
               {
               
                 time: '2017-05-03',
                 name: '李4华',
                 phone:'13800138000',
                 source:'李笑笑',
                 indate:'20170503',
                 status:'已过期',
               }]
    }
  },
  mounted(){
    // 调用搜索条件
    this.onSubmit();
  },
  methods: {
    getOrderList(doctor_id,day){
      this.order_list = [];
      const hospital_id = this.$store.state.hospitalInfo._id;
      // const day = moment(new Date()).format('YYYY-MM-DD');
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

    filterStatus(value, row){
      return row.status_value === value;
    },

    onSubmit() {
      const day = !this.formInline.day ? 'all' : moment(this.formInline.day).format('YYYY-MM-DD');
      const doctor_id = this.formInline.doctor_id;
      this.getOrderList(doctor_id,day);
    },

    // filterOrder(){
    //   let now = moment(new Date()).format('HH:mm');
    //   let status = this.formInline.status;
    //   if(status == 'wait') {

    //   }
    // },
    
     handleEdit (index, row) {
       this.dialogFormVisible = true;
       this.form = Object.assign({}, row);
       this.table_index = index;
     },

     handleSave () {
       this.$confirm('确认提交吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         cancelButtonClass: 'cancel'
       }).then(() => {
        this.editLoading = true;//显示正在修改，圆圈跑起来
        this.tableData[this.table_index] = this.form;
        this.tableData.splice(this.table_index, 1, this.form);
        this.$message({
           message: "操作成功！",
           type: 'success'
         });
         this.editLoading = false;
         this.dialogFormVisible = false;
       })
     },

     handleSaveadd () {

       this.$confirm('确认提交吗？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         cancelButtonClass: 'cancel'
       }).then(() => {
        //this.editLoading = true;//显示正在修改，圆圈跑起来
        let vm=this;
        vm.tableData.push(vm.form);
        this.$message({
           message: "操作成功！",
           type: 'success'
        });
        this.dialogFormVisibleadd = false;
       });
     },

     handleDelete (index, row) {
       this.tableData.splice(index, 1);
       this.$message({
         message: "操作成功！",
         type: 'success'
       });
     },

      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      },
      handleSelect(key, keyPath) {
      console.log(key, keyPath);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

.appointreport .el-table__header-wrapper{
  height: 59px;
}
.appointreport{
  padding: 20px;
}

.appointreport .content{
 /* width: 95%;*/
  min-height: 450px;
  background: white;
 /* margin: 0 auto;*/
}
.appointreport .block{
  text-align: center;
}
.appointreport .center{
  text-align: center;
}
</style>
