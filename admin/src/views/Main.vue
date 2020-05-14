<template>
    <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['1']"  :default-active="$route.path">
          <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>运营管理</template>
              <el-menu-item-group>
                <template slot="title">广告位</template>
                <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                <el-menu-item index="/ads/list">广告位列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">文章</template>
                <el-menu-item index="/article/create">新建文章</el-menu-item>
                <el-menu-item index="/article/list">文章列表</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>诊所系统</template>
              <el-menu-item-group>
                <template slot="title">诊所</template>
                <el-menu-item index="/hospital/create">新建诊所</el-menu-item>
                <el-menu-item index="/hospital/list">诊所列表</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
              <template slot="title"><i class="el-icon-message"></i>就医助手</template>
              <el-menu-item-group>
                <template slot="title">用户</template>
                <el-menu-item index="/patient/list">用户列表</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
        </el-menu>
    </el-aside>
    
    <el-container>
        <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/login" style="text-decoration:none" ><span @click="loginout()">退出</span></router-link></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>管理员</span>
        </el-header>
        
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
    </el-container>
    </el-container>    
</template>

<script>
  export default {
    name: 'Main',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods:{
      loginout(){
        console.log('loginout');
        window.localStorage.removeItem('token');
      }
    }
  };
</script>


<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
