<template>
	<div class="register">
		<div class="content">
			<div class="part">
				<h1>{{id?'编辑':'新建'}}用户</h1>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form1">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="登录密码：" prop="password" :style="id?'display:none':'display:block'">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item> -->
          <el-form-item label="头像：" prop="image" >
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.image" :src="ruleForm.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="性别" prop="sex" >
            <el-input v-model="ruleForm.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age" >
            <el-input v-model="ruleForm.age"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone" >
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="height" >
            <el-input v-model="ruleForm.height"></el-input>
          </el-form-item>
          <el-form-item label="体重" prop="weight" >
            <el-input v-model="ruleForm.weight"></el-input>
          </el-form-item>
          <el-form-item label="过敏药品" prop="allergy" >
            <el-input v-model="ruleForm.allergy"></el-input>
          </el-form-item>
          <el-form-item label="体温" prop="temperature" >
            <el-input v-model="ruleForm.temperature"></el-input>
          </el-form-item>
          <el-form-item label="血压" prop="pressure" >
            <el-input v-model="ruleForm.pressure"></el-input>
          </el-form-item>
          <el-form-item label="心率" prop="heart" >
            <el-input v-model="ruleForm.heart"></el-input>
          </el-form-item>
				 	<el-form-item>
            <el-button type="primary" class="registerBtn" @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="primary"  @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
  import {
    getOnePatient,
    patientEdit
  } from 'network/patient' 

  export default {
    props: {
      id: {}
    },
    data() {
    	var validateName = (rule, value, callback) => {
    	    if (!value) {
    	        return callback(new Error('请输入姓名'));
    	    }else {
    	    	if (value.length>=0&&value.length<=18) {
    	    		callback();
    	    	} else {
    	       		callback(new Error('长度在0到18个字符之间'));
    	    	}
    		}
    	};
      // var validatePassword = (rule, value, callback) => {
      //   if(this.id){
      //     callback();
      //   }else {
      //     if (!value) {
      //         return callback(new Error('请输入6-18位的密码'));
      //     }else {
      //     	if (value.length>=6&&value.length<=18) {
      //     		callback();
      //     	} else {
      //        		callback(new Error('密码长度在6到18个字符之间'));
      //     	}
      //     }
      // 	}
      // };
    	var validateSex = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入性别'));
        }
        else {
         callback();
        }
      };
      var validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入年龄'));
        }
        else {
         callback();
        }
    	};
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入联系电话'));
        }
        else {
         callback();
        }
      };
      var validateHeight = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入身高'));
        }
        else {
         callback();
        }
      };
      var validateWeight = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入身高'));
        }
        else {
         callback();
        }
      };
     	return {
        ruleForm: {
          name: '',
          image: '',
          sex: '',
          age: '',
          phone:'',
          height: '',
          weight: '',
          allergy: '',
          temperature: '',
          pressure:'',
          heart:''
        },
        rules: {
          name: [
            {validator: validateName, trigger: 'blur' }
          ],
          sex: [
            {validator: validateSex, trigger: 'blur' }
          ],
          age: [
            {validator: validateAge, trigger: 'blur' }
          ],
          height: [
            {validator: validateHeight, trigger: 'blur' }
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur' }
          ],
          weight: [
            {validator: validateWeight, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 获取某个病人
      getOnePatient(){
        getOnePatient(this.id).then(res=>{
          console.log(res);
          this.ruleForm = res.data;
        })
      },
      
      // 编辑病人功能
      patientEdit(){
        const model = {
          name: this.ruleForm.name,
          image: this.ruleForm.image,
          sex: this.ruleForm.sex,
          age: this.ruleForm.age,
          height: this.ruleForm.height,
          phone: this.ruleForm.phone,
          weight: this.ruleForm.weight,
          allergy: this.ruleForm.allergy,
          temperature:this.ruleForm.temperature,
          pressure:this.ruleForm.pressure,
          heart:this.ruleForm.heart,
        }
        patientEdit(this.id,model).then(res=>{
            this.$message({
              type:'success',
              message:'修改成功'
            })
            this.$router.push('/patient/list');
          })
      },
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.patientEdit();
          } else {
            this.$message.error('请补充完整信息');
            return false;
          }
        });
      },

      // 重置表格
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      // 图片上传回调
      handleAvatarSuccess(res, file) {
        this.ruleForm.picture = res.url;
      },

      // 图片上传前检测
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    created(){
      this.id && this.getOnePatient();
    }
  }
</script>

<style>
	.register{
		width: 100%;
    text-align: center;
	}
	.register .head{
		line-height: 50px;
    background: #fff;
		text-align: right;
		border-bottom: 1px solid #f1f1f1;
	}
	.register .head ul li{
		list-style: none;
		display: inline-block;
		margin-left: 30px;
		color: #666;
		font-size: 14px;
	}
  .register .head a{
    color: #666;
    text-decoration: none;
  }
	.register .head ul li:last-child{
		margin-right: 100px;
	}
	.register .head ul li i{
		margin-right: 10px;
	}
	.register .part{
		width: 780px;
		margin: 0 auto;
		text-align: center;
	}
	.register .part h1{
		width: 100%;
    font-family: "华文行楷";
		line-height: 50px;
    margin-left:35px;
    margin-top: 25px;
	}
  .register .part .form1{
    width: 400px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .register .part .registerBtn{
    margin-right: 50px;
  }

  .register .avatar-uploader .el-upload {
    border: 1px dashed  #acb6c2;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #fff;
  }
  .register .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .register .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .register .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .register .el-cascader {
    width: 298px;
  }
</style>
