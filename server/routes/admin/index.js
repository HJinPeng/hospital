module.exports = app => {
  const express = require('express');

  // ---------------插件--------------
  const multer = require('multer');
  const assert = require('http-assert');
  const jwt = require('jsonwebtoken');

  const router = express.Router({
    mergeParams: true  //合并URL的参数
  })

  // -------------------模型 ----------------
  const AdminUserModel = require('../../models/admin/AdminUser');
  const AdvertModel = require('../../models/admin/Advert');
  const ArticleModel = require('../../models/admin/Article');
  const HospitalModel = require('../../models/hospital/Hospital');

  // -------------初始化管理员账号-----
  router.get('/addadmin',async(req,res)=>{
    await AdminUserModel.create({username:'admin',password:'123456'});
    res.send('add is ok');
  })
  router.post('/login',async(req,res) => {
    const {username, password} = req.body;
    const user = await AdminUserModel.findOne({username}).select('+password');//将password也查出来
    if(!user) res.status(422).send('用户不存在');
    const isValid = require('bcryptjs').compareSync(password,user.password);
    if(!isValid) res.status(422).send('密码不正确');
    const token = jwt.sign({
      id: user._id
    },app.get('secret'))
    res.send({token});
    res.send('12');
  });

  
  // -------------------------------------------上传文件接口---------------------
  const upload = multer({dest:__dirname + '/../../uploads'})
  router.post('/upload',upload.single('file'), async(req,res)=>{
    const file = req.file;
    file.url ='http://localhost:3000/uploads/'+file.filename
    //file.url = `http://wzry.hjinpeng.top/uploads/${file.filename}`
    res.send(file);
  })

  // -----------------------------------------图片静态资源
  app.use('/uploads',express.static(__dirname + '/../../uploads'))

  // ----------------------------------- 新建广告----------------------
  router.post('/ad/add',async(req,res)=>{
    const data = req.body;
    await AdvertModel.create(data,function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('add ad is ok');
    })
  })

  // ----------------------------------- 广告列表 ---------------------
  router.get('/ad/list',async(req,res)=>{
    await AdvertModel.find({},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // ------------------- -----------  获取某个广告
  router.get('/ad/:id',async(req,res)=>{
    const id = req.params.id;
    await AdvertModel.findById({'_id':id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // ------------------------------- 编辑某个广告
  router.put('/ad/edit/:id',async(req,res)=>{
    const id = req.params.id;
    const model = req.body;
    await AdvertModel.updateOne({'_id':id},model,function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('edit ad is ok');
    })
  })

  // ------------------------------- 删除某个广告
  router.delete('/ad/del/:id',async(req,res)=>{
    const id = req.params.id;
    await AdvertModel.deleteOne({'_id':id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('del ad is ok');
    })
  });

  // ----------------------------------- 新建文章----------------------
  router.post('/article/add',async(req,res)=>{
    const data = req.body;
    await ArticleModel.create(data,function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('add article is ok');
    })
  })
  
  // ----------------------------------- 文章列表 ---------------------
  router.get('/article/list',async(req,res)=>{
    await ArticleModel.find({},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // ------------------------------- 删除某个文章
  router.delete('/article/del/:id',async(req,res)=>{
    const id = req.params.id;
    await ArticleModel.deleteOne({'_id':id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('del article is ok');
    })
  });

  // ------------------- -----------  获取某个文章
  router.get('/article/:id',async(req,res)=>{
    const id = req.params.id;
    await ArticleModel.findById({'_id':id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // ------------------------------- 编辑某个文章
  router.put('/article/edit/:id',async(req,res)=>{
    const id = req.params.id;
    const model = req.body;
    await ArticleModel.updateOne({'_id':id},model,function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('edit article is ok');
    })
  })


  // ------------------------------ 添加诊所-------------
  router.post('/hospital/add',async(req,res)=>{
    const hospital = req.body.hospital;
    await HospitalModel.find({hospital},function(err,docs){
      if(err) {
        return console.log(err);
      }
      console.log('docs,',docs);
      if(docs.length != 0) {
        res.status(422).send('诊所已存在');
      }else{
        HospitalModel.create(req.body,function(err,docs){
          if(err) {
            return console.log(err);
          }
          res.send('add hospital is ok');
        });
      }
    })
  })
    
  // ----------------------------------- 诊所列表 ---------------------
  router.get('/hospital/list',async(req,res)=>{
    await HospitalModel.find({},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // ------------------------------- 删除某个诊所
  router.delete('/hospital/del/:id',async(req,res)=>{
    const id = req.params.id;
    await HospitalModel.deleteOne({'_id':id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('del hospital is ok');
    })
  });

  // ------------------- -----------  获取某个诊所
  router.get('/hospital/:id',async(req,res)=>{
    const id = req.params.id;
    await HospitalModel.findById({'_id':id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // ------------------------------- 编辑某个诊所
  router.put('/hospital/edit/:id',async(req,res)=>{
    const id = req.params.id;
    const model = req.body;
    await HospitalModel.updateOne({'_id':id},model,function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('edit hospital is ok');
    })
  })
  app.use('/admin/api',router);

}