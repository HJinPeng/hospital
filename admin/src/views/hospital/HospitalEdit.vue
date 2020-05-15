<template>
	<div class="register">
		<div class="content">
			<div class="part">
				<h1>{{id?'编辑':'新建'}}诊所</h1>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm form1">
          <el-form-item label="诊所名称：" prop="hospital">
            <el-input v-model="ruleForm.hospital"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password" :style="id?'display:none':'display:block'">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="诊所图片：" prop="picture" >
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/admin/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.picture" :src="ruleForm.picture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="诊所介绍：" prop="intro" >
            <el-input type="textarea" v-model="ruleForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="所属区域："  >
            <el-cascader
              size="large"
              :options="options"
              v-model="ruleForm.area"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="具体地址：" prop="address" >
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="诊所电话：" prop="phone" >
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="诊所擅长：" prop="good"  >
            <el-input v-model="ruleForm.good" placeholder="发烧/骨科..."></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="administrator" >
            <el-input v-model="ruleForm.administrator"></el-input>
          </el-form-item>
          <el-form-item label="诊所邮箱：" prop="email" >
            <el-input v-model="ruleForm.email"></el-input>
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
  // 省市区插件
  import { regionData } from 'element-china-area-data'
  import {
    hospitalAdd,
    getOneHospital,
    hospitalEdit
  } from 'network/hospital' 

  export default {
    props: {
      id: {}
    },
    data() {
    	var validateHospital = (rule, value, callback) => {
    	    if (!value) {
    	        return callback(new Error('请输入诊所名称'));
    	    }else {
    	    	if (value.length>=3&&value.length<=18) {
    	    		callback();
    	    	} else {
    	       		callback(new Error('长度在3到18个字符之间'));
    	    	}
    		}
    	};
      var validatePassword = (rule, value, callback) => {
        if(this.id){
          callback();
        }else {
          if (!value) {
              return callback(new Error('请输入6-18位的密码'));
          }else {
          	if (value.length>=6&&value.length<=18) {
          		callback();
          	} else {
             		callback(new Error('密码长度在6到18个字符之间'));
          	}
          }
      	}
      };
    	var validateIntro = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入诊所简介'));
        }
        else {
         callback();
        }
    	};
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入诊所联系电话'));
        }
        else {
         callback();
        }
      };
      var validateGood = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入诊所的专长：如 发烧/骨科'));
        }
        else {
         callback();
        }
      };
      var validateAddress = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入诊所地址'));
        }
        else {
         callback();
        }
      };
      var validateAdministrator = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入诊所负责人'));
        }
        else {
         callback();
        }
      };
    	var validateEmail=(rule, value, callback) => {
    		if (value === '') {
    	        callback(new Error('请输入联系邮箱'));
    	    }
    	    else{
    	    	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    	    	if(!reg.test(value)){
    	    		callback(new Error('输入的联系邮箱必须包含@'));
    	    	}
    	    	else{
    	    		callback();
    	    	}
    	    }
    	}
     	return {
        options: regionData,
        ruleForm: {
          hospital: '',
          password: '',
          picture: '',
          intro: '',
          area:[],
          address: '',
          phone: '',
          good: '',
          administrator: '',
          email:''
        },
        rules: {
          hospital: [
            {validator: validateHospital, trigger: 'blur' }
          ],
          password: [
            {validator: validatePassword, trigger: 'blur' }
          ],
          intro: [
            {validator: validateIntro, trigger: 'blur' }
          ],
          address: [
            {validator: validateAddress, trigger: 'blur' }
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur' }
          ],
          good: [
            {validator: validateGood, trigger: 'blur' }
          ],
          administrator: [
            {validator: validateAdministrator, trigger: 'blur' }
          ],
          email: [
            {validator: validateEmail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 获取某个诊所
      getOneHospital(){
        getOneHospital(this.id).then(res=>{
          console.log(res);
          this.ruleForm = res.data;
        })
      },
      // 添加诊所功能
      hospitalAdd(){
        hospitalAdd(this.ruleForm).then(res=>{
          console.log(res);
          if(res.status == 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.$router.push('/hospital/list');
          }else {
            this.$message.error('res.data');
          }
        })
      },

      // 编辑诊所功能
      hospitalEdit(){
        const model = {
          hospital: this.ruleForm.hospital,
          picture: this.ruleForm.picture,
          intro: this.ruleForm.intro,
          area: this.ruleForm.area,
          address: this.ruleForm.address,
          phone: this.ruleForm.phone,
          good: this.ruleForm.good,
          administrator: this.ruleForm.administrator,
          email:this.ruleForm.email
        }
        console.log('model',model);
        hospitalEdit(this.id,model).then(res=>{
            this.$message({
              type:'success',
              message:'修改成功'
            })
            this.$router.push('/hospital/list');
          })
      },
      // 提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.id) {
              this.hospitalEdit();
            }else {
              this.hospitalAdd();
            }
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
      },

      // 选择省市区回调
      handleChange (value) {
        this.ruleForm.area = value;
        //console.log(value)
      }
    },
    created(){
      this.id && this.getOneHospital();
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
    width: 298px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .register .avatar {
    width: 298px;
    height: 100px;
    display: block;
  }
  .register .el-cascader {
    width: 298px;
  }
</style>
