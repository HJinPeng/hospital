module.exports = app => {
  const express = require('express');

  //const assert = require('http-assert');

  
  const Hospital = require('../../models/Hospital');
  // 用户注册接口
  app.post('/hospital/api/register', async(req,res) => {
    const data = req.body;
    // let model = new Promise((resolve,reject)=>{
    //   Hospital.create(data,function(err){
    //     if(err){
    //       reject(err);
    //     }
    //   })
    //   resolve();
    // }).then((response)=>{
    //   console.log('ok');
    //   res.status(200).send('ok');
    // }).catch(err=>{
    //   console.log(err);
    //   res.status(422).send('no');
    // })
    // let error = false;
    // function handlerError(){
    //   console.log('res');
    //   error = true;
    // }
    console.log(data);
    const model =  await Hospital.create(data, function(err){
      if(err) {
        console.log(err);
        return  
        //return console.log('邮箱或者用户名已存在');
           // err.status(422).send('邮箱或者用户名已存在');
        //return res.status(422).send('邮箱或者用户名已存在');
      }
    });
    res.status(200).send(model);
    // if(error == true) {
    //   console.log(error);
    //   res.status(422).send('邮箱或者用户名已存在');
    // }else{
    //   console.log(error);
    //   res.send(model);
    // }
    // //await model;
    // console.log('333');
    // console.log(model);
    // if(model == 'undefined'){
    //   res.status(422).send('邮箱或者用户名已存在');
    // }
    // //console.log(model);
    // res.send(model);
  })

  // 上传文件接口
  const multer = require('multer');
  const upload = multer({dest:__dirname + '/../../uploads'})
  app.post('/hospital/api/upload',upload.single('file'), async(req,res)=>{
    const file = req.file;
    file.url ='http://localhost:3000/uploads/'+file.filename
    //file.url = `http://wzry.hjinpeng.top/uploads/${file.filename}`
    res.send(file);
  })

  // 用户登录接口
  const jwt = require('jsonwebtoken');
  app.post('/hospital/api/login',async(req,res) => {
    const {hospital, password} = req.body;
    const user = await Hospital.findOne({hospital}).select('+password');//将password也查出来
    //assert(user,422,'用户不存在');
    console.log(user);
    if(!user) res.status(422).send('用户不存在');
    const isValid = require('bcryptjs').compareSync(password,user.password);
    console.log(isValid);
    if(!isValid) res.status(422).send('密码不正确');
    //assert(isValid,422,'密码不正确');
    const token = jwt.sign({
      id: user._id
    },app.get('secret'))
    res.send({token});
  });


  const router = express.Router({
    mergeParams: true  //合并URL的参数
  })

  
}