<template>
  <div class="doctor">
    <el-button class="add_doctor"  type="primary" @click="addDoctorInfo">新增医生</el-button>
    <h3 class="title">医生列表</h3>
    <el-table :data="doctorList">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="医生姓名"></el-table-column>
			<el-table-column prop="phone" label="联系电话"></el-table-column>
			<el-table-column prop="department" label="科室"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="editDoctorInfo(`${scope.row._id}`)">编辑</el-button>
        <el-button class="delete" type="text" size="small" @click="deleteDoctor(`${scope.row._id}`)">删除</el-button>
        <!-- <el-button type="text" size="small"
        @click="$router.push(`/admin_users/edit/${scope.row._id}`)">编辑</el-button>
        <el-button class="delete" type="text" size="small"
        @click="remove(scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
    </el-table>
		
		<!-- 新增编辑医生对话框 -->
		<el-dialog
		  :title="dialogTitle"
		  :visible.sync="dialogAddDoctor"
			class="doctorInfo"
		  >
		  <el-form label-position="left" label-width="60px" :model="doctorInfo">
		    <el-form-item label="姓名">
		      <el-input v-model="doctorInfo.name"></el-input>
		    </el-form-item>
				<el-form-item label="性别">
				  <el-input v-model="doctorInfo.sex"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
				  <el-input v-model="doctorInfo.age"></el-input>
				</el-form-item>
				<el-form-item label="电话">
				  <el-input v-model="doctorInfo.phone"></el-input>
				</el-form-item>
				<el-form-item label="科室">
				  <el-input v-model="doctorInfo.department"></el-input>
				</el-form-item>
				<el-form-item label="擅长">
				  <el-input v-model="doctorInfo.good"></el-input>
				</el-form-item>
				<el-form-item label="头像">
				  <el-upload
				    class="avatar-uploader"
				    action="http://localhost:3000/hospital/api/upload"
				    :show-file-list="false"
				    :on-success="handleAvatarSuccess"
				    :before-upload="beforeAvatarUpload">
				    <img v-if="doctorInfo.image" :src="doctorInfo.image" class="avatar">
				    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				  </el-upload>
				</el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogAddDoctor = false">取 消</el-button>
		    <el-button type="primary" @click="handleDoctorInfo">确 定</el-button>
		  </span>
		</el-dialog>
  </div>
</template>

<script>
	import {
		SET_DOCTOR_LIST
	} from '../../store/mutations-types.js'
  export default {
    name: 'doctor',
    data(){
      return {
				doctorInfo:{
					hospital_id: this.$store.state.hospitalInfo._id,
					name: '',
					sex: '',
					age: '',
					phone: '',
					image: '',
					department: '',
					good: ''
				},
				doctorList: this.$store.state.doctorList,
				dialogTitle: '新增医生',
				editDoctorId: '',
        dialogAddDoctor: false
      }
    },
		mounted() {
			this.getDoctorList();
		},
		methods:{
			// ---------------------头像上传处理函数---------------
			beforeAvatarUpload(file){
				const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;
					if (!isPic) {
						this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
					}
					if (!isLt2M) {
						this.$message.error('上传头像图片大小不能超过 2MB!');
					}
					return isPic && isLt2M;
			},
			handleAvatarSuccess(res,file){
				console.log('res',res);
				console.log('file',file);
				this.doctorInfo.image = res.url;
			},
			
			// -------------------------------新增医生--------------
			addDoctorInfo(){
				this.dialogTitle='新增医生';
				this.dialogAddDoctor = true;
				this.doctorInfo = {
					hospital_id: this.$store.state.hospitalInfo._id,
					name: '',
					sex: '',
					age: '',
					phone: '',
					image: '',
					department: '',
					good: ''
				}
			},
			
			// -------------------------------编辑医生信息----------------
			editDoctorInfo(id){
				let doctor ;
				let length = this.doctorList.length;
				for(let i = 0 ; i < length; i++) {
					if(this.doctorList[i]._id == id) {
						doctor = this.doctorList[i];
						break;
					}
				}
				this.editDoctorId = doctor._id;
				this.dialogTitle = '编辑医生';
				this.dialogAddDoctor = true;
				this.doctorInfo = {
					hospital_id: this.$store.state.hospitalInfo._id,
					name: doctor.name,
					sex: doctor.sex,
					age: doctor.age,
					phone: doctor.phone,
					image: doctor.image,
					department: doctor.department,
					good: doctor.good
				}
			},
			
			// ------------------------------ 提交医生信息（新增/编辑）-------------------
			handleDoctorInfo(){
				if(this.dialogTitle == '新增医生') {
					this.$request.post('/doctor/add',this.doctorInfo).then(res=>{
						this.$message({
							type: 'success',
							message: '新增成功'
						})
						// this.getDoctorList();
					})
				}else if(this.dialogTitle == '编辑医生'){
					this.$request.put('/doctor/edit',{doctorInfo:this.doctorInfo,doctorId:this.editDoctorId}).then(res=>{
						this.$message({
							type: 'success',
							message: '修改成功'
						})
						// this.getDoctorList();
					})
				}else {
					this.$message({
						type: 'error',
						message: '系统出错'
					})
				}
				this.dialogAddDoctor = false;
				this.getDoctorList();
			},
			
			// ----------------------------- 删除医生------------------------------
			deleteDoctor(id){
				this.$confirm('确认删除？').then(_=> {
					this.$request.delete('/doctor/delete/'+id).then(res=>{
						this.getDoctorList();
						this.deleteDoctorId = '';
					})
				}).catch(_ => {});
				
			},
			// ------------------------------获取医生列表---------------
			getDoctorList(){
				this.$request.post('/doctor/list',{hospital_id:this.doctorInfo.hospital_id}).then(res=>{
					console.log(res);
					this.doctorList = res.data;
					this.$store.commit(SET_DOCTOR_LIST,res.data)
				})
			},

		}
  }
</script>

<style>
  .doctor {
    padding: 15px;
  }

  .doctor .add_doctor {
    float: right;
    margin-bottom: 15px;
    margin-right: 30px;
  }

  .doctor .title {
    margin-bottom: 10px;
  }

  .doctor .delete {
    color: red
  }
	
	.doctor .doctorInfo .el-dialog {
		width: 35%;
	}
	
	.doctor .doctorInfo .el-dialog .el-dialog__body {
		padding-left: 50px;
		padding-right: 50px;
	}
	
	.doctor .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	.doctor .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	.doctor .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	.doctor .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
</style>
