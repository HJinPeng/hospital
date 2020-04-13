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
  const Ad = mongoose.model('Ad');
  const PatientModel = require('../../models/wx/Patient');
  const HospitalModel = require('../../models/hospital/Hospital');
  const DoctorModel = require('../../models/hospital/Doctor');
  const ArrangeModel = require('../../models/hospital/Arrange');
  const OrderModel = require('../../models/wx/Order');


  // -------------------- 轮播图-----------------
  router.get('/home/ad',async(req,res)=>{
    //const item = await Ad.find().lean();
    const item = await Ad.find().where({
      isNow: true
    }).limit(1).lean();
    res.send(item);
    //res.send("222");
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
      await ArrangeModel.findById({'_id':arrange_id},function(err,docs){
        if(err) {
          return console.log(err);
        }
        const number = docs.number - 1;
        ArrangeModel.updateOne({'_id':arrange_id},{'number':number},function(err,docs){
          if(err) {
            return console.log(err);
          }
        })
  
      })
      await OrderModel.create({arrange_id,patient_id},function(err, docs) {
        if(err) {
          return console.log(err);
        }
        res.send('add order is ok');
      });
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
      },
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

  app.use('/wx/api',router);
}