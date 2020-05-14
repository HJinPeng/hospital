<template>
  <div>
    <h1>用户列表</h1>
    <el-table :data="items.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.phone.includes(search))">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入姓名/手机号关键字"/>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/patient/edit/${scope.row._id}`)">编辑</el-button>
          <el-button class="delete" type="text" size="small" 
          @click="remove(scope.row)">删除</el-button>
          <el-button class="change" type="text" size="small" 
          @click="$router.push(`/patient/changepass/${scope.row._id}`)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>    
  </div>

</template>

<script>
  import {getPatients,delPatient,changePatientPass} from 'network/patient'

  export default {
    name: 'PatientList',
    data(){
      return {
        search:'',
        items: []
      }
    },
    methods: {
      // 获取诊所列表数据
      getPatients() {
        getPatients().then(res => {
          this.items = res.data;
          console.log(this.items);
        });
      },

      // 删除某个诊所
      remove(row) {
        this.$confirm('确认删除 ['+row.name+']？',"提示",{
          type: 'warning'
        })
          .then(_ => {
            delPatient(row._id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getPatients();
            })
          })
          .catch(_ => {});
      },
    },
    created() {
      // 获取分类列表数据
      this.getPatients();
    },
  }
</script>

<style scoped>

</style>