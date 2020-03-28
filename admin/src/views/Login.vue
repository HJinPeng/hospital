<template>
  <div>
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {adminLogin} from 'network/admin_user'
  export default {
    name: 'Login',
    data() {
      return {
        model:{}
      }
    },
    methods: {
      login(){
        adminLogin(this.model).then(res=>{
          console.log(res);
          localStorage.setItem('token',res.data.token);
          this.$router.push('/');
          this.$message({
            type: 'success',
            message: '登录成功'
          })
        })
      }
    },
  };
</script>


<style scoped>

.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>
