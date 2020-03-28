module.exports = app => {
  const router = require('express').Router();
  const mongoose = require('mongoose');

  const Ad = mongoose.model('Ad');

  router.get('/home/ad',async(req,res)=>{
    //const item = await Ad.find().lean();
    const item = await Ad.find().where({
      isNow: true
    }).limit(1).lean();
    res.send(item);
    //res.send("222");
  });

  app.use('/wx/api',router);
}