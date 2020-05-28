<template>
  <div class="articleone">
    <div class="title">{{model.title}}</div>
    <div class="sub">
      <div class="tag">标签：<span>{{model.tab}}</span></div>
      <div class="time">{{model.updatedAt}}</div>
    </div>
    <div class="body" v-html="model.body"></div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props:{
    id:{required: true}
  },
  data(){
    return {
      model: {}
    }
  },
  mounted(){
    this.showArticle();
  },
  methods:{
    // 打开文章
    showArticle(){
      const _id = this.id;
      this.$request.get('/article/'+_id).then(res=>{
        console.log(res);
        const data = res.data;
        data.updatedAt = data.updatedAt.slice(0,10)+' '+data.updatedAt.slice(11,19);
        this.model = data;
        document.title = data.title;
      });
    },
  }
}
</script>

<style>
.articleone {
  background: #fff;
  padding: 30px;
}
.articleone .title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.articleone .sub {
  color: #666;
  margin-top: 10px;
  padding: 10px;
  border-bottom: 1px solid #dfe6ec;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

.articleone .sub span {
  padding: 3px 10px;
  background: #1296db;
  border-radius: 4px;
  color: #fff;
}

.articleone .body {
  padding: 30px;
}

.articleone .body .ql-align-center {
  text-align: center;
}

.articleone .body .ql-align-right {
  text-align: right;
}
.articleone .body p {
  margin-bottom: 15px;
  line-height: 25px;
}
</style>