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
  import {SET_CASE_EXAM,SET_EXAM_CHOOSE} from '../../store/mutations-types'
  export default {
    data() {
      return {
        selectData: this.$store.state.examChoose,
        tableData: this.$store.state.examList.filter(item=>{return item.status == true})
      }
    },
    mounted() {
      this.initChoose();
    },
    methods: {
      initChoose(){
        if (this.selectData) {
          this.selectData.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val){
        console.log(val);
        this.selectData = val;
      },
      save(){
        let examItem = '';
        let examPrice = 0;
        for(let i = 0 ; i < this.selectData.length; i++) {
          examItem += this.selectData[i].name + ' ';
          examPrice += this.selectData[i].price;
        }
        examPrice = parseFloat(examPrice.toFixed(2));
        this.$store.commit(SET_EXAM_CHOOSE,this.selectData);
        this.$store.commit(SET_CASE_EXAM,{examItem,examPrice});
        this.$message({
          type: 'success',
          message: '保存成功'
        });
      }
    },
    
  }
</script>