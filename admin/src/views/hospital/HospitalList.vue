<template>
  <div>
    <h1>诊所列表</h1>
    <el-table :data="items.filter(data => !search || data.hospital.toLowerCase().includes(search.toLowerCase())|| data.phone.includes(search))">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="hospital" label="诊所名称"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入诊所名/手机号关键字"/>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/hospital/edit/${scope.row._id}`)">编辑</el-button>
          <el-button class="delete" type="text" size="small" 
          @click="remove(scope.row)">删除</el-button>
          <el-button class="change" type="text" size="small" 
          @click="$router.push(`/hospital/changepass/${scope.row._id}`)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>    
  </div>

</template>

<script>
  import {getHospitals,delHospital,changeHospitalPass} from 'network/hospital'

  export default {
    name: 'HospitalList',
    data(){
      return {
        search:'',
        items: []
      }
    },
    methods: {
      // 获取诊所列表数据
      getHospitals() {
        getHospitals().then(res => {
          this.items = res.data;
          console.log(this.items);
        });
      },

      // 删除某个诊所
      remove(row) {
        this.$confirm('确认删除 ['+row.hospital+']？',"提示",{
          type: 'warning'
        })
          .then(_ => {
            delHospital(row._id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getHospitals();
            })
          })
          .catch(_ => {});
      },
    },
    created() {
      // 获取分类列表数据
      this.getHospitals();
    },
  }
</script>

<style scoped>

</style>