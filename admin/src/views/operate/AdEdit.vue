<template>
  <div id="AdEdit">
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form  label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称: ">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="启用状态: ">
        <el-switch
          v-model="model.status"
          active-text="启用"
          inactive-text="禁用">
        </el-switch>
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-input v-model="model.url"></el-input>
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
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    adAdd,
    getOneAd,
    adEdit
  } from 'network/ad'

  export default {
    name: 'AdEdit',
    props: {
      id: {}
    },
    data(){
      return {
        model:{
          name: '',
          status: true,
          url: '',
          image: ''
        }
      }
    },
    methods: {
      // 获取某条广告
      getOneAd(){
        getOneAd(this.id).then(res=>{
          this.model = res.data;
        })
      },
      // 保存
      save(){
        if(this.id) {
          adEdit(this.id,this.model).then(res=>{
            this.$message({
              type:'success',
              message:'修改成功'
            })
            this.$router.push('/ads/list');
          })
        }else {
          adAdd(this.model).then(res=>{
            this.$message({
              type:'success',
              message:'添加成功'
            })
            this.$router.push('/ads/list');
          })
        }
        
      },
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
      }
    },
    created(){
      this.id && this.getOneAd();
    }
  }
</script>

<style>

</style>