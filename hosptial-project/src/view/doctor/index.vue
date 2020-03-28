<template>
  <div class="doctor">
    <el-button class="add_doctor"  type="primary" @click="dialogAddDoctor = true">新增医生</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogAddDoctor"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddDoctor = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddDoctor = false">确 定</el-button>
      </span>
    </el-dialog>
    <h3 class="title">医生列表</h3>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="username" label="医生账号"></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small" >编辑</el-button>
        <el-button class="delete" type="text" size="small">删除</el-button>
        <!-- <el-button type="text" size="small"
        @click="$router.push(`/admin_users/edit/${scope.row._id}`)">编辑</el-button>
        <el-button class="delete" type="text" size="small"
        @click="remove(scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'doctor',
    data(){
      return {
        dialogAddDoctor: false,
        items: [
          {_id:'111',username:'123321'},
          {_id:'111',username:'123321'},
          {_id:'111',username:'123321'}
        ]
      }
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

  .doctor .delete{
    color: red
  }
</style>
