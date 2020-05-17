module.exports = app => {
  const express = require('express');
  const mongoose = require('mongoose');
  const router = express.Router({
    mergeParams: true  //合并URL的参数
  })


  // ------------------ 引用插件---------------
  const multer = require('multer');
  const jwt = require('jsonwebtoken');
  const moment = require('moment');

  // -------------------- 引用模型 -----------------
  const PatientModel = require('../../models/wx/Patient');
  const HospitalModel = require('../../models/hospital/Hospital');
  const DoctorModel = require('../../models/hospital/Doctor');
  const ArrangeModel = require('../../models/hospital/Arrange');
  const OrderModel = require('../../models/wx/Order');
  const Hospital_PatientModel = require('../../models/hospital/Hospital_Patient');
  const AdvertModel = require('../../models/admin/Advert');
  const ArticleModel = require('../../models/admin/Article');
  const HistoryModel = require('../../models/hospital/History');

  // -------------------- 轮播图-----------------
  router.get('/home/ad',async(req,res)=>{
    //const item = await Ad.find().lean();
    await AdvertModel.find({'status':true},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
    
  });

  // -------------------- 文章列表-----------------
  router.get('/article/list',async(req,res)=>{
    //const item = await Ad.find().lean();
    await ArticleModel.find({'status':true},{'body':0},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    }).sort({'updatedAt': '-1'})
    
  });


  // -------------------- 某篇文章-----------------
  router.get('/article/:id',async(req,res)=>{
    //const item = await Ad.find().lean();
    const id = req.params.id;
    await ArticleModel.findById({'_id':id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
    
  });

  // -------------------------------------------上传文件接口---------------------
  const upload = multer({dest:__dirname + '/../../uploads'})
  router.post('/upload',upload.single('file'), async(req,res)=>{
    console.log('upload',req);
    const file = req.file;
    file.url ='http://localhost:3000/uploads/'+file.filename
    //file.url = `http://wzry.hjinpeng.top/uploads/${file.filename}`
    res.send(file);
  })

  // -----------------------------------------图片静态资源
  app.use('/uploads',express.static(__dirname + '/../../uploads'))




  // ------------------------- 注册接口------------------
  router.post('/register',async(req,res) => {
    const model = req.body;
    await PatientModel.create(model,function(err,docs) {
      if(err) {
        return console.log(err);
      }
      console.log(docs);
      res.send('register is ok');
    });
  })

  // ----------------------  登录接口---------------------
  router.post('/login',async(req,res) => {
    const {phone, password} = req.body;
    const patient = await PatientModel.findOne({phone}).select('+password');//将password也查出来
    if(!patient) {
      res.status(422).send('用户不存在');
    }
    const isValid = require('bcryptjs').compareSync(password,patient.password);
    if(!isValid) {
      res.status(422).send('密码不正确');
    }
    const token = jwt.sign({
      id: patient._id
    },app.get('secret'))
    const patientInfo = {
      _id: patient._id,
      image: patient.image,
      name: patient.name,
      sex: patient.sex,
      age: patient.age,
      phone: patient.phone,
      height: patient.height,
      weight: patient.weight,
      allergy: patient.allergy,
      temperature: patient.temperature,
      pressure: patient.pressure,
      heart: patient.heart,
      time: patient.time
    }
    res.send({token,patientInfo})
  })


  // ------------------------- 获取所有医生------------------
  router.get('/doctor/list',async(req,res)=>{
    await DoctorModel.find({},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs); 
    })
  })


  // ------------------------- 获取诊所----------------------
  router.post('/hospital',async(req,res) => {
    
    await HospitalModel.find({},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // ------------------------ 获取诊所和医生信息-------------
  router.get('/hospital/:_id',async(req, res) => {
    const _id = req.params._id;
    const model = {
      hospital: {},
      doctor: []
    };
    await HospitalModel.findById({_id},function(err,docs) {
      if(err) {
        console.log(err);
        return;
      }
      model.hospital = docs;
    })
    await DoctorModel.find({hospital_id:_id},function(err,docs) {
      if(err) {
        return console.log(err);
      }
      model.doctor = docs;
    })
    res.send(model)
  })

  // ------------------------------ 获取医生信息和排班信息----------------
  router.post('/doctor/arrange',async(req, res) => {
    const {doctor_id, day} = req.body;
    const model = {
      doctor: {},
      arrange: []
    }
    await DoctorModel.findById({'_id':doctor_id},function(err,docs) {
      if(err) {
        return console.log(err);
      }
      model.doctor = docs;
    })
    await ArrangeModel.find({doctor_id,day:{ $gte: day}},function(err,docs) {
      if(err) {
        return console.log(err);
      }
      model.arrange = docs;
    })
    res.send(model);
  })


  // ----------------------------- 订单是否已存在-------------
  router.post('/order/isexist',async(req,res) => {
    const {arrange_id, patient_id} = req.body;
    await OrderModel.find({arrange_id,patient_id},async function(err,docs) {
      if(err) {
        return console.log(err);
      }
      if(docs.length == 0) {
        res.status(200).send('order is no exist');
      }else {
        res.status(402).send('请勿重复挂号！');
      }
    })
  })

  // ----------------------------- 挂号接口---------------------
  router.post('/order/add',async(req, res) => {
    const {arrange_id, patient_id} = req.body;
    await OrderModel.find({arrange_id,patient_id},async function(err,docs) {
      if(err) {
        return console.log(err);
      }
      await ArrangeModel.findById({'_id':arrange_id},async function(err,docs){
        if(err) {
          return console.log(err);
        }
        // let doctor_id = docs.doctor_id;
        let hospital_id = docs.hospital_id;
        const number = docs.number - 1;
        await ArrangeModel.updateOne({'_id':arrange_id},{'number':number},function(err,docs){
          if(err) {
            return console.log(err);
          }
        })
        
        await Hospital_PatientModel.findOne({hospital_id,patient_id},function(err,docs){
          if(err) {
            return console.log(err);
          }
          console.log('hp',docs);
          if(docs == null) {
            Hospital_PatientModel.create({hospital_id,patient_id,times:1},function(err,docs){
              if(err) {
                return console.log(err);
              }
            })
          }else {
            const times = docs.times+1;
            Hospital_PatientModel.updateOne({hospital_id,patient_id},{times:times},function(err,docs){
              if(err) {
                return console.log(err);
              }
            })
          }
        })

        await OrderModel.create({arrange_id,patient_id},function(err, docs) {
          if(err) {
            return console.log(err);
          }
          res.send('add order is ok');
        });
      })

      
    })
    
  })


  // ------------------------------- 待支付订单信息--------------
  router.post('/order/info',async(req, res) => {
    const {arrange_id,patient_id} = req.body;
    await ArrangeModel.aggregate([
      {
        $match: {
          '_id': mongoose.Types.ObjectId(arrange_id)
        }
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'doctor_id',
          foreignField: '_id',
          as: 'doctorInfo'
        }
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'doctorInfo.hospital_id',
          foreignField: '_id',
          as: 'hospitalInfo'
        }
      }
    ],function(err,docs){
      if(err) {
        console.log(err);
        return;
      }
      console.log(docs);
      res.send(docs);
    })
  })

  // --------------------------- 获取订单列表接口-------------
  router.post('/order/list',async(req, res) => {
    const patient_id = req.body.patient_id;
    console.log(patient_id);
    const list = {
      wait: [],
      finish: [],
      past: []
    }
    const day = moment(new Date()).format('YYYY-MM-DD');
    const end_time =  moment(new Date()).format('HH:mm');
    console.log(typeof end_time);
    console.log(end_time);
    await OrderModel.aggregate([
      {
        $match: {
          'patient_id': mongoose.Types.ObjectId(patient_id),
          'status': 0
        }
      },
      {
        $lookup: {
          from: 'arranges',
          localField: 'arrange_id',
          foreignField: '_id',
          as: 'arrangeInfo'
        }
      },
      {
        $match: {
          $or: [
            {'arrangeInfo.day': { $gt: day}} ,
            {'arrangeInfo.day':day,'arrangeInfo.end_time':{$gte: end_time}}
          ]
        }
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'arrangeInfo.hospital_id',
          foreignField: '_id',
          as: 'hospitalInfo'
        }
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'arrangeInfo.doctor_id',
          foreignField: '_id',
          as: 'doctorInfo'
        }
      }
      // {
      //   $match: {
      //     'arrangeInfo.day': { $gt: day},
      //     //'arrangeInfo.end_time': { $gte: '19:00'}
      //   }
      // },
      // {
      //   $match: {
      //     'arrangeInfo.end_time': { $gte: end_time}
      //   }
      // }
    ],function(err,docs) {
      if(err) {
        return console.log(err);
      }
      list.wait = docs;
    })
    await OrderModel.aggregate([
      {
        $match: {
          'patient_id': mongoose.Types.ObjectId(patient_id),
          'status': 0
        }
      },
      {
        $lookup: {
          from: 'arranges',
          localField: 'arrange_id',
          foreignField: '_id',
          as: 'arrangeInfo'
        }
      },
      {
        $match: {
          $or: [
            {'arrangeInfo.day': { $lt: day}} ,
            {'arrangeInfo.day':day,'arrangeInfo.end_time':{$lte: end_time}}
          ]
        }
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'arrangeInfo.hospital_id',
          foreignField: '_id',
          as: 'hospitalInfo'
        }
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'arrangeInfo.doctor_id',
          foreignField: '_id',
          as: 'doctorInfo'
        }
      },
    ],function(err,docs) {
      if(err) {
        return console.log(err);
      }
      list.past = docs;
    })
  
    await OrderModel.aggregate([
      {
        $match: {
          'patient_id': mongoose.Types.ObjectId(patient_id),
          'status': 1
        }
      },
      {
        $lookup: {
          from: 'arranges',
          localField: 'arrange_id',
          foreignField: '_id',
          as: 'arrangeInfo'
        }
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'arrangeInfo.hospital_id',
          foreignField: '_id',
          as: 'hospitalInfo'
        }
      },
      {
        $lookup: {
          from: 'doctors',
          localField: 'arrangeInfo.doctor_id',
          foreignField: '_id',
          as: 'doctorInfo'
        }
      },
    ],function(err,docs) {
      if(err) {
        return console.log(err);
      }
      list.finish = docs;
    })
    
    // await OrderModel.find({patient_id,status: 1},function(err,docs) {
    //   if(err) {
    //     return console.log(err);
    //   }
    //   list.finish = docs;
    // })

    // await OrderModel.find({patient_id,time:{ $gte: day},status: 0},function(err,docs){
      // if(err) {
      //   return console.log(err);
      // }
      // list.wait = docs;
    // })
    // await OrderModel.find({patient_id,status: 1},function(err,docs) {
    //   if(err) {
    //     return console.log(err);
    //   }
    //   list.finish = docs;
    // })
    // await OrderModel.find({patient_id,time:{ $lt: day},status: 0},function(err,docs) {
    //   if(err) {
    //     return console.log(err);
    //   }
    //   list.past = docs;
    // })
    res.send(list)
  })


  // --------------------------搜索诊所---------------
  router.get('/hospital/search/:value',async(req,res)=>{
    const value = req.params.value;
    console.log(value);
    const reg_rule = new RegExp(value,"i");
    await HospitalModel.find({'hospital':reg_rule},function(err,docs) {
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // ------------------------- 搜索病历史-----------------
  router.post('/history/list',async(req,res)=>{
    const patient_id = req.body.patient_id;
    console.log('patient_id',patient_id);
    await HistoryModel.aggregate([
      {
        $match: {
          'patient_id': mongoose.Types.ObjectId(patient_id)
        }
      },
      {
        $lookup: {
          from: 'hospitals',
          localField: 'hospital_id',
          foreignField: '_id',
          as: 'hospitalInfo'
        }
      },
      {
        $sort:{"day":-1}
      }
      
    ],function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })
  
  router.get('/history/:history_id',async(req,res)=>{
    const history_id = req.params.history_id;
    await HistoryModel.findById({'_id':history_id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  app.use('/wx/api',router);
}