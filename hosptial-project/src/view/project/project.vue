<template>
  <div class="project" >
    <el-menu :default-active="activeIndex" class="el-menu-demo nav" mode="horizontal" @select="handleSelect" style="background-color: #ffffff;">
      <el-menu-item index="1">
        <router-link to="/home/project/examination">检查费</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/home/project/medicinal">药品管理</router-link>
      </el-menu-item>
    </el-menu> 
    	
  <!-- <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <router-link to="/home/project/smallproject">
      <el-menu-item index="1">项目</el-menu-item>
      </router-link>
    <router-link to="/home/project/package">
      <el-menu-item index="2">套餐</el-menu-item>
      </router-link>
    <router-link to="/home/project/registration">
      <el-menu-item index="3">挂号费</el-menu-item>
      </router-link>
  </el-menu> -->
  <router-view ></router-view> 
  </div>
</template>
<script >

export default {
  name: 'project',
  data () {
    return {
      msg: '项目',
      activeIndex:'1',
      handleSelect(key, keyPath) {
      console.log(key, keyPath);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project{
 
}

.project .nav a {
	text-decoration: none;
}
</style>
