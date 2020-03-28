module.exports = options => {
  const jwt = require('jsonwebtoken');
  const Hospital = require('../models/Hospital');

  return async(req,res,next)=>{
    const token = String(req.headers.authorization || '').split(' ').pop();
    if(!token) {
      res.status(401).send('请先登录');
    }
    const {id} = jwt.verify(token,req.app.get('secret'));
    if(!id) {
      res.status(401).send('请先登录');
    }
    req.user = await AdminUser.findById(id);
    if(!req.user) {
      res.status(401).send('请先登录');
    }
    await next();
  }
}