<template>
  <div class="medicinal" >
  <!-- <br> -->
    <div class="operate">
      <el-button type="primary" @click="addMedic">添加药品</el-button>
    </div>

    <div class="content">
      <el-table  :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()) || data.serial_number.toLowerCase().includes(search.toLowerCase()))"  style="width: 100%" >
        <el-table-column  label="编号" width="220">
          <template scope="scope">
            {{scope.row._id}}
          </template>
        </el-table-column>
        <el-table-column  label="药品序列号" width="200">
          <template scope="scope">
            {{scope.row.serial_number}}
          </template>
        </el-table-column>
        <el-table-column  prop="name" label="药品名称"></el-table-column>
        <el-table-column  prop="price" label="单价 (元)"></el-table-column>
        <el-table-column  prop="number" label="余量"></el-table-column>
        <el-table-column  label="启用状态">
          <template scope="scope">
            {{scope.row.status}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入药品/序列号"/>
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
		  :visible.sync="dialogMedic"
			class="medic_info"
		  >
		  <el-form label-position="left" label-width="90px" :model="medicInfo">
		    <el-form-item label="药品序列号:">
		      <el-input v-model="medicInfo.serial_number"></el-input>
		    </el-form-item>
        <el-form-item label="药品名称:">
		      <el-input v-model="medicInfo.name"></el-input>
		    </el-form-item>
				<el-form-item label="价格:">
				  <el-input v-model="medicInfo.price"></el-input>
				</el-form-item>
        <el-form-item label="余量:">
				  <el-input v-model="medicInfo.number"></el-input>
				</el-form-item>
				<el-form-item label="启用状态:">
				  <el-radio v-model="medicInfo.status" label='true'>启用</el-radio>
          <el-radio v-model="medicInfo.status" label='false'>禁用</el-radio>
				</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogMedic = false">取 消</el-button>
		    <el-button type="primary" @click="handleMedicInfo">确 定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
import {SET_MEDIC_LIST} from '../../store/mutations-types'
export default {
  name: 'medicinal',
  data() {
    return {
      hospital_id: this.$store.state.hospitalInfo._id,
      tableData: [],
      dialogTitle: '新增药品',
      dialogMedic: false,
      medicInfo: {
        hospital_id: this.$store.state.hospitalInfo._id,
        serial_number: '',
        name: '',
        price: '',
        number: '',
        status: 'true'
      },
      activeId: '',
      search: ''
    }
  },
  mounted(){
    this.getMedicList();
  },
  methods: {
    addMedic(){
      this.dialogTitle = '新增药品'
      this.dialogMedic = true;
      this.medicInfo = {
        hospital_id: this.$store.state.hospitalInfo._id,
        serial_number: '',
        name: '',
        price: '',
        number: '',
        status: 'true'
      }
    },
    getMedicList(){
      this.$request.post('/medic/list',{hospital_id: this.hospital_id}).then(res=>{
        console.log(res);
        this.tableData = res.data;
        this.$store.commit(SET_MEDIC_LIST,this.tableData);
      })
    },
    handleMedicInfo(){
      if(this.medicInfo.name == '' || this.medicInfo.price == '') {
        this.$message({
          type: 'warning',
          message: '请补充完整信息再提交'
        })
      }else {
        if(this.dialogTitle == '新增药品') {
          this.$request.post('/medic/add',this.medicInfo).then(res=>{
            console.log(res);
            this.dialogMedic = false;
            this.medicInfo = {
              hospital_id: this.$store.state.hospitalInfo._id,
              serial_number: '',
              name: '',
              price: '',
              number: '',
              status: 'true'
            }
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.getMedicList();
          })
        }else {
          this.$request.put('/medic/edit/'+this.activeId,this.medicInfo).then(res=>{
            console.log(res);
            this.dialogMedic = false;
            this.medicInfo = {
              hospital_id: this.$store.state.hospitalInfo._id,
              serial_number: '',
              name: '',
              price: '',
              number: '',
              status: 'true'
            }
            this.activeId = '';
            this.$message({
              type: 'success',
              message: '更新成功'
            })
            this.getMedicList();
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
          this.medicInfo = {
            hospital_id: this.$store.state.hospitalInfo._id,
            serial_number: list[i].serial_number,
            name: list[i].name,
            price: list[i].price,
            number: list[i].number,
            status: list[i].status+''
          }
          break;
        }
      }
      this.dialogTitle = '编辑药品';
      this.activeId = _id;
      this.dialogMedic = true;
    },
    handleDelete(_id){
      this.$confirm('确认删除？').then(_=> {
        this.$request.delete('/medic/delete/'+_id).then(res=>{
          this.getMedicList();
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
.medicinal{
  padding: 20px;
}

.medicinal .content{
 /* width: 95%;*/
  height: 400px;
  background: white;
 /* margin: 0 auto;*/
}

.medicinal .operate {
  margin-bottom: 20px;
}

.medicinal .medic_info .el-dialog {
  width: 35%;
}

.medicinal .medic_info .el-dialog .el-dialog__body {
  padding-left: 50px;
  padding-right: 50px;
}
	
</style>
