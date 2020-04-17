<template>
  <div class="examination" >
  <!-- <br> -->
    <div class="operate">
      <el-button type="primary" @click="addExam">添加检查项</el-button>
    </div>

    <div class="content">
      <el-table  :data="tableData.filter(data => !searchName || data.name.toLowerCase().includes(searchName.toLowerCase()))"  style="width: 100%" >
        <el-table-column  label="编号" width="300">
          <template scope="scope">
            {{scope.row._id}}
          </template>
        </el-table-column>
        <el-table-column  prop="name" label="项目名称"></el-table-column>
        <el-table-column  prop="price" label="单价 (元)"></el-table-column>
        <el-table-column  label="启用状态">
          <template scope="scope">
            {{scope.row.status}}
          </template>
        </el-table-column>
        <el-table-column width="250">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="searchName"
              size="mini"
              placeholder="输入药品关键字"/>
          </template>
          <template scope="scope">
            <el-button size="small"  @click="handleEdit(scope.row._id)"> 编辑</el-button>
            <el-button size="small" type="danger"  @click="handleDelete(scope.row._id)">删除</el-button> 
          </template>
        </el-table-column>
      </el-table>  
    </div>
    <!-- 新增编辑检查项目对话框 -->
		<el-dialog
		  :title="dialogTitle"
		  :visible.sync="dialogExam"
			class="exam_info"
		  >
		  <el-form label-position="left" label-width="80px" :model="examInfo">
		    <el-form-item label="项目名称:">
		      <el-input v-model="examInfo.name"></el-input>
		    </el-form-item>
				<el-form-item label="费用:">
				  <el-input v-model="examInfo.price"></el-input>
				</el-form-item>
				<el-form-item label="启用状态:">
				  <el-radio v-model="examInfo.status" label='true'>启用</el-radio>
          <el-radio v-model="examInfo.status" label='false'>禁用</el-radio>
				</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogExam = false">取 消</el-button>
		    <el-button type="primary" @click="handleExamInfo">确 定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'examination',
  data() {
    return {
      hospital_id: this.$store.state.hospitalInfo._id,
      tableData: [],
      dialogTitle: '新增检查项',
      dialogExam: false,
      examInfo: {
        hospital_id: this.$store.state.hospitalInfo._id,
        name: '',
        price: '',
        status: 'true'
      },
      activeId: '',
      searchName: ''
    }
  },
  mounted(){
    this.getExamList();
  },
  methods: {
    addExam(){
      this.dialogTitle = '新增检查项'
      this.dialogExam = true;
      this.examInfo = {
        hospital_id: this.$store.state.hospitalInfo._id,
        name: '',
        price: '',
        status: 'true'
      }
    },
    getExamList(){
      this.$request.post('/exam/list',{hospital_id: this.hospital_id}).then(res=>{
        console.log(res);
        this.tableData = res.data;
      })
    },
    handleExamInfo(){
      if(this.examInfo.name == '' || this.examInfo.price == '') {
        this.$message({
          type: 'warning',
          message: '请补充完整信息再提交'
        })
      }else {
        if(this.dialogTitle == '新增检查项') {
          this.$request.post('/exam/add',this.examInfo).then(res=>{
            console.log(res);
            this.dialogExam = false;
            this.examInfo = {
              hospital_id: this.$store.state.hospitalInfo._id,
              name: '',
              price: '',
              status: 'true'
            }
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.getExamList();
          })
        }else {
          this.$request.put('/exam/edit/'+this.activeId,this.examInfo).then(res=>{
            console.log(res);
            this.dialogExam = false;
            this.examInfo = {
              hospital_id: this.$store.state.hospitalInfo._id,
              name: '',
              price: '',
              status: 'true'
            }
            this.activeId = '';
            this.$message({
              type: 'success',
              message: '更新成功'
            })
            this.getExamList();
          })
        }
        
      }
    },
    handleEdit(_id){
      const list = this.tableData;
      const length = list.length;
      const result = {};
      for(let i = 0 ; i < length ; i++) {
        if(list[i]._id == _id) {
          this.examInfo = {
            hospital_id: this.$store.state.hospitalInfo._id,
            name: list[i].name,
            price: list[i].price,
            status: list[i].status+''
          }
          break;
        }
      }
      this.dialogTitle = '编辑检查项';
      this.activeId = _id;
      this.dialogExam = true;
    },
    handleDelete(_id){
      this.$confirm('确认删除？').then(_=> {
        this.$request.delete('/exam/delete/'+_id).then(res=>{
          this.getExamList();
          this.$message({
            type:'success',
            message: '删除成功'
          })
        })
      }).catch(_ => {});
    }
  }
}
</script>

<style>
.examination{
  padding: 20px;
}

.examination .content{
 /* width: 95%;*/
  height: 400px;
  background: white;
 /* margin: 0 auto;*/
}

.examination .operate {
  margin-bottom: 20px;
}

.examination .exam_info .el-dialog {
  width: 35%;
}

.examination .exam_info .el-dialog .el-dialog__body {
  padding-left: 50px;
  padding-right: 50px;
}
	
</style>
