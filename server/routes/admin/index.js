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

  app.use('/admin/api',router);

}