<template>
  <div>
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form  label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题: ">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="标签: ">
        <el-input v-model="model.tab"></el-input>
      </el-form-item>
      <el-form-item label="图片" style="margin-top: 1rem;">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3000/admin/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="model.image" :src="model.image" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="启用状态: ">
        <el-switch
          v-model="model.status"
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
      </el-form-item>
      <el-form-item label="详情: ">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  import { request } from 'network/request';

  import {
    articleAdd,
    getOneArticle,
    articleEdit
  } from 'network/article'

  export default {
    name: 'ArticleEdit',
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data(){
      return {
        model:{
          title: '',
          status: true,
          tab: '',
          body: '',
          image: ''
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file){
        this.model.image = res.url;
      },
      beforeAvatarUpload(file){
        const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPGPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPGPNG && isLt2M; 
      },
      // 获取某篇文章
      getOneArticle(){
        getOneArticle(this.id).then(res=>{
          this.model = res.data;
        })
      },
      // 保存
      save(){
        if(this.id) {
          articleEdit(this.id,this.model).then(res=>{
            this.$message({
              type:'success',
              message:'修改成功'
            })
            this.$router.push('/article/list');
          })
        }else {
          articleAdd(this.model).then(res=>{
            this.$message({
              type:'success',
              message:'添加成功'
            })
            this.$router.push('/article/list');
          })
        }
        
      },
      // 富文本图片上传
      async handleImageAdded(file, Editor, cursorLocation, resetUploader){
        const formData = new FormData();
        formData.append("file", file);
        
        const res = await request({
          url: "/upload",
          method: "POST",
          data: formData
        });
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      },
    },
    created(){
      this.id && this.getOneArticle();
    }
  }
</script>

<style>

</style>