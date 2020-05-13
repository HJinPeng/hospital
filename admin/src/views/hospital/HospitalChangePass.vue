<template>
	<div class="changepass">
    <el-form :model="ruleForm"  :rules="rules"  ref="ruleForm" label-width="120px" @submit.native.prevent="save('ruleForm')">
      <el-form-item label="新密码">
        <el-input v-model="ruleForm.password" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>

<script>
  import {
    changeHospitalPass
  } from 'network/hospital' 

  export default {
    props: {
      id: {}
    },
    data() {
      var validatePassword = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入6-18位的密码'));
        }else {
          if (value.length>=6&&value.length<=18) {
            callback();
          } else {
              callback(new Error('密码长度在6到18个字符之间'));
          }
        }
      };
     	return {
        ruleForm: {
          password: ''
        },
        rules: {
          password: [
            {validator: validatePassword, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 提交
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            changeHospitalPass(this.id,this.ruleForm.password).then(res=>{
              this.$message({
                type:'success',
                message:'修改成功'
              })
              this.$router.push('/hospital/list');
            })
          } else {
            this.$message.error('请补充完整信息');
            return false;
          }
        });
      },
    },
  }
</script>

<style>

</style>
