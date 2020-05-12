<template>
  <div class="adlist">
    <h1>广告位列表</h1>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="230"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="启用状态" 
          :filters="[{ text: '启用', value: true }, { text: '禁用', value: false }]"
          :filter-method="filterStatus">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status == true ? 'primary' : 'danger'"
              disable-transitions>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: auto"
              :src="scope.row.image"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="链接地址"></el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
          <el-button class="delete" type="text" size="small" 
          @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>    
  </div>

</template>

<script>
  import {getAds,delAd} from 'network/ad'

  export default {
    name: 'AdList',
    data(){
      return {
        items: []
      }
    },
    methods: {
      // 获取分类列表数据
      getAds() {
        getAds().then(res => {
          this.items = res.data;
          console.log(this.items);
        });
      },

      // 删除某个分类
      remove(row) {
        this.$confirm('确认删除 ['+row.name+']？',"提示",{
          type: 'warning'
        })
          .then(_ => {
            delAd(row._id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getAds();
            })
          })
          .catch(_ => {});
      },

      // ------------------ 筛选启用状态
      filterStatus(value, row) {
        return row.status === value;
      },
    },
    created() {
      // 获取分类列表数据
      this.getAds();
    },
  }
</script>

<style scoped>

</style>