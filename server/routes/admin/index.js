module.exports = app => {
  const express = require('express');

  const assert = require('http-assert');

  // 用户登录接口
  const AdminUser = require('../../models/AdminUser');
  const jwt = require('jsonwebtoken');
  app.use('/admin/api/login',async(req,res) => {
    const {username, password} = req.body;
    const user = await AdminUser.findOne({username}).select('+password');//将password也查出来
    assert(user,422,'用户不存在');
    const isValid = require('bcryptjs').compareSync(password,user.password);
    assert(isValid,422,'密码不正确');
    const token = jwt.sign({
      id: user._id
    },app.get('secret'))
    res.send({token});
  });


  const router = express.Router({
    mergeParams: true  //合并URL的参数
  })

  
}