<template>
  <div class="account" >
    <!-- 表格内容 -->
    <div class="content">
      <el-table  :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.phone.includes(search))"  account_type="width: 100%" >
        <el-table-column  prop="_id"label="编号"  width="300" align="center"></el-table-column>
        <el-table-column  prop="name" label="用户"  align="center"></el-table-column>
        <el-table-column  prop="phone" label="手机号码" align="center"></el-table-column>
        <el-table-column  prop="times" label="预约次数" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入用户名/手机号关键字"/>
              </template>
              <template scope="scope">
                <el-button size="small" type="primary" @click="clickPatient(scope.row._id)">查看</el-button>
                
              </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title='`就诊历史：${historyList.length}次`'
      :visible.sync="dialogHistory"
      width="80%"
      :before-close="handleClose">
      <el-table :data="historyList" :default-sort="{prop:'day',order:'descending'}">
        <el-table-column property="day" label="日期" width="120" sortable ></el-table-column>
        <el-table-column property="time" label="时间" width="80"></el-table-column>
        <el-table-column property="talk" label="主诉"></el-table-column>
        <el-table-column property="now" label="现病史"></el-table-column>
        <el-table-column property="physique" label="体格检查"></el-table-column>
        <el-table-column property="handle" label="诊断"></el-table-column>
        <el-table-column property="examItem" label="检查项目"></el-table-column>
        <el-table-column property="medicItem" label="医药单"></el-table-column>
      </el-table>
      </span>
    </el-dialog>
  </div>
</template>
<script >
export default {
  username: 'account',
  data () {
    return {
      dialogHistory: false,
      historyList: [],
      hospital_id: this.$store.state.hospitalInfo._id,
      search:'',
      tableData:[]
    }
  },
  //实例化就获取数据
  mounted(){
    this.getPatient();
  },
  methods: {
    getPatient(){
      this.$request.post('/patient/list',{hospital_id:this.hospital_id}).then(res=>{
        console.log(res);
        const array = res.data;
        for(let i = 0 ; i < array.length ; i++) {
          let info = array[i].patientInfo[0];
          info.times = array[i].times;
          this.tableData.push(info);
        }
      })
    },
    clickPatient(patient_id){
      console.log(patient_id);
      const hospital_id = this.hospital_id;
      this.$request.post('/history',{hospital_id,patient_id}).then(res=>{
        console.log(res);
        const data = res.data;
        this.historyList = data;
        this.dialogHistory = true;
      })
    },
    handleClose(){
      this.dialogHistory = false;
    }
  }
}
</script>
<style type="text/css">
  .account{
    padding: 20px;
  }
  .account .content{
    height: 400px;
   background: white;
  }
  .account .block{
    text-align: center;
  }
  .account .center{
    text-align: center;
  }
  .account .left{
    width: 50%;
    float: left;
    text-align: center;
  }
  .account .right{
     width: 50%;
    float: right;
    text-align: center;
  }
  .account .lleft{
    text-align: left;
  }
  .account .el-form-item__content {
    font-size: 23px;
  }
  .account .content_size{
    font-size: 20px;
  }
  .el-dialog__header{
    background: #f6f6f6;
    padding-bottom: 10px;
  }
</style>
