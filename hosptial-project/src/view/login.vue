<template>
	<div class="login">
		<div class="login-container">
			<el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="card-box login-form">
			    <h1 class="title">诊所管理系统</h1>
			    <el-form-item  prop="hospital" class="item userItem">
			        <span class="svg-container">
			        	<i class="fa fa-user-o" aria-hidden="true"></i>
			        </span>
			        <el-input name="hospital" type="text" v-model="loginForm.hospital"  placeholder="诊所名称" class="input-content"></el-input>
			    </el-form-item>
			    <el-form-item  prop="password" class="item">
			        <span class="svg-container">
			        	<i class="fa fa-lock" aria-hidden="true"></i>
			        </span>
			        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="密码" class="input-content"></el-input>
			    </el-form-item>
			    <el-form-item>
			        <el-button type="primary" @click="handleLogin">
			            登录
			        </el-button>
			        <el-button type="primary">
			            <router-link to="/register">注册</router-link>
			        </el-button>
			    </el-form-item>
			</el-form>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
  import {
    SET_TOKEN,
    SET_HOSPITAL_NAME
  } from '../store/mutations-types.js'
	import Home from '@/view/home'
	import Hello from '@/view/home_content/hello'
	//import store from './../store';
	export default{
    data(){
      return {
        loginForm: {
          hospital: '',
          password:'',
        },
        loginRules: {
          hospital: [
            { required: true, message: '请输入诊所名称', trigger: 'blur' },
            { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ]
        }
      }
    },
		methods:{
      async login(){
        const res = await this.$request.post('/login',this.loginForm);
        if(res.status == 200) {
          window.localStorage.setItem("token",res.data.token);
          this.$store.commit(SET_TOKEN,res.data.token);
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          });
          this.$store.commit(SET_HOSPITAL_NAME,res.data.hospitalInfo)
          this.$router.push({ path: 'home/hello',component:Hello})
        }
      },
			handleLogin:function(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.login();
          } else {
            return false;
          }
        });
			}
		}
	}
</script>


<style>
	.login .login-container{
		position: relative;
		width: 500px;
		height: 300px;
		margin: 15% auto;
		background: #fff;
		text-align: center;
		border-radius: 5px;
	}
	.login .login-container .title{
		position: relative;
		top: 30px;
		font-family: "华文行楷"
	}
	.login .login-container .userItem{
		margin-top: 50px;

	}
	.login .login-container .item .svg-container{
		display: inline-block;
		width: 40px;
		text-align: center;
		color: #889aa4;
		font-size: 20px;
	}
	.login .login-container .item .input-content{
		display: inline-block;
		height: 47px;
    	width: 55%;
	}
	.login .login-container a{
		color: #fff;
		text-decoration: none;
	}
  .login .el-form-item__error{
    left: 27% !important;
  }
</style>
