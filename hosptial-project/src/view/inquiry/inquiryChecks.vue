<template>
  <div class="inOne-Checks">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="60">
      </el-table-column>
      <el-table-column
        prop="_id"
        label="编号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="检查项目">
      </el-table-column>
      <el-table-column
        prop="price"
        label="金额">
      </el-table-column>
    </el-table>
    <div class="checeksub">
      <el-button type="primary" @click="save()">保存</el-button>
    </div>
  </div>
</template>

<style>
  .checeksub{
    margin-top: 10px;
  }
</style>

<script>
  export default {
    data() {
      return {
        selectData: [],
        tableData: this.$store.state.examList
      }
    },
    mounted() {
    },
    methods: {
      handleSelectionChange(val){
        console.log(val);
        this.selectData = val;
      },
      save(){
          // console.log('单个删除选择的row：',index,'-----',row);
        this.$confirm('确认保存吗？', '提示', {}).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功'
          });
        }).catch(() => {
        }); 
      }
    },
    
  }
</script>