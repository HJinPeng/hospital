<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="启用状态" 
        :filters="[{ text: '启用', value: true }, { text: '禁用', value: false }]"
        :filter-method="filterStatus">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status == true ? 'primary' : 'danger'"
            disable-transitions>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入标题关键字"/>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" 
          @click="$router.push(`/article/edit/${scope.row._id}`)">编辑</el-button>
          <el-button class="delete" type="text" size="small" 
          @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>    
  </div>

</template>

<script>
  import {getArticles,delArticle} from 'network/article'

  export default {
    name: 'ArticleList',
    data(){
      return {
        search:'',
        items: []
      }
    },
    methods: {
      // 获取分类列表数据
      getArticles() {
        getArticles().then(res => {
          this.items = res.data;
          console.log(this.items);
        });
      },

      // 删除某个分类
      remove(row) {
        this.$confirm('确认删除 ['+row.title+']？',"提示",{
          type: 'warning'
        })
          .then(_ => {
            delArticle(row._id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getArticles();
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
      this.getArticles();
    },
  }
</script>

<style scoped>

</style>