module.exports = app => {
  const express = require('express');

  const router = express.Router({
    mergeParams: true  //合并URL的参数
  })

  // -----------------------------------------引用插件----------------------
  const multer = require('multer');
  const jwt = require('jsonwebtoken');
  const mongoose = require('mongoose');
  // -----------------------------------------引入模型--------------------------
  const HospitalModel = require('../../models/hospital/Hospital');
  const DoctorModel = require('../../models/hospital/Doctor');
  const ArrangeModel = require('../../models/hospital/Arrange');
  const ExamModel = require('../../models/hospital/Exam');
  const MedicModel = require('../../models/hospital/Medic');
  const HistoryModel = require('../../models/hospital/History');
  const OrderModel = require('../../models/wx/Order');
  const Hospital_PatientModel = require('../../models/hospital/Hospital_Patient');

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

  
  // ------------------------------------------用户注册接口----------------
  router.post('/register', async(req,res) => {
    const data = req.body;
    // let model = new Promise((resolve,reject)=>{
    //   HospitalModel.create(data,function(err){
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
    const model =  await HospitalModel.create(data, function(err){
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


  // ------------------------------------------用户登录接口---------------------
  router.post('/login',async(req,res) => {
    const {hospital, password} = req.body;
    const user = await HospitalModel.findOne({hospital}).select('+password');//将password也查出来
    //assert(user,422,'用户不存在');
    //console.log(user);
    if(!user) res.status(422).send('用户不存在');
    const isValid = require('bcryptjs').compareSync(password,user.password);
    //console.log(isValid);
    if(!isValid) res.status(422).send('密码不正确');
    //assert(isValid,422,'密码不正确');
    const token = jwt.sign({
      id: user._id
    },app.get('secret'))
    const hospitalInfo = {
      _id: user._id,
      name: hospital,
      picture: user.picture,
      intro: user.intro,
      area: user.area,
      address: user.address,
      phone: user.phone,
      good: user.good,
      administrator: user.administrator,
      email: user.email
    }
    res.send({
      token,
      hospitalInfo
    });
  });


  // ------------------------------------------新增医生接口------------------
  router.post('/doctor/add',async(req,res) => {
    let model ;
    await DoctorModel.create(req.body,function(err,docs){
      if(err) {
        return console.log(err);
      }
      model = docs;
        //console.log(docs);  
      //console.log('model',model);
      res.send('add doctor is ok');
    });
  })


  // --------------------------------------- 医生编辑接口--------------------
  router.put('/doctor/edit',async(req,res) => {
    let {doctorInfo,doctorId} = req.body;
    await DoctorModel.updateOne({"_id":doctorId},doctorInfo)
    res.send('edit doctor is ok');
  })


  // -------------------------------------- 医生删除接口--------------------
  router.delete('/doctor/delete/:_id',async(req,res) => {
    //console.log(req.params._id);
    //console.log(req.body);
    const _id = req.params._id;
    await DoctorModel.deleteOne({"_id":_id});
    res.send('delete doctor is ok');
  })

  // ------------------------------------------医生列表接口------------------
  router.post('/doctor/list',async(req,res) => {
    //console.log('req.body',req.body.hospital_id);
    const hospital_id = req.body.hospital_id;
    const doctorList = await DoctorModel.find({hospital_id});
    //console.log(doctorList);
    res.send(doctorList);
  })


  // --------------------------------------- 新增排班接口------------------
  router.post('/arrange/add',async(req, res) => {
    const data = req.body;
    await ArrangeModel.create(data,function(err,docs){
      if(err) {
        return console.log(err);
      }else {
        res.send(docs);
      }
    });
  })

  // ---------------------------------- 获取排班列表接口（条件：医生ID(all)，）
  // ------ 格式化医生列表函数------
  function formatArrange(docs){
    //console.log(docs);
    let array = [];
    let arrange = docs;
    for(var i = 0; i < arrange.length ; i++) {
      if(array.length == 0) {
        let o = {};
        o.day = arrange[0].day;
        let arr = [];
        let arr_obj = {};
        arr_obj.doctor_id = arrange[0].doctor_id;
        arr_obj.doctorName = arrange[0].doctorInfo[0].name;
        let date = [];
        let date_obj = {};
        date_obj._id = arrange[0]._id;
        date_obj.value = arrange[0].start_time+'-'+arrange[0].end_time;
        date.push(date_obj);
        arr_obj.date = date;
        arr.push(arr_obj);
        o.data = arr;
        array.push(o);
      }else {
        for(var j = 0 ; j < array.length;j++) {
          // 说明是这个日期的：2020-04-02
          if(arrange[i].day == array[j].day) {
            //console.log('arrange[i].day == array[j].day');
            //console.log(i);
            //console.log(j);
            var k;
            for(k = 0 ; k < array[j].data.length; k++) {
              console.log('k',k);
              console.log('array[j].data[k]',array[j].data[k].doctor_id);
              console.log('arrange[i].doctor_id',arrange[i].doctor_id);
              console.log('isequer',arrange[i].doctor_id+'' === array[j].data[k].doctor_id+'');
              // 说明是2020-04-02的某个医生的排班
              if(arrange[i].doctor_id +'' == array[j].data[k].doctor_id +'') {
                console.log('==');
                let o = {};
                o._id = arrange[i]._id;
                o.value = arrange[i].start_time+'-'+arrange[i].end_time;
                array[j].data[k].date.push(o);
                break;
              }
            }
            // 说明是2020-04-02的，但没有暂时还没有该医生排班
            if(k == array[j].data.length) {
              console.log('++');
              let arr_obj = {};
              arr_obj.doctor_id = arrange[i].doctor_id;
              arr_obj.doctorName = arrange[i].doctorInfo[0].name;
              let date = [];
              let date_obj = {};
              date_obj._id = arrange[i]._id;
              date_obj.value = arrange[i].start_time+'-'+arrange[i].end_time;
              date.push(date_obj);
              arr_obj.date = date;
              array[j].data.push(arr_obj);
            }
            break;
          }
        }
        if(j == array.length) {
          let o = {};
          o.day = arrange[i].day;
          let arr = [];
          let arr_obj = {};
          arr_obj.doctor_id = arrange[i].doctor_id;
          arr_obj.doctorName = arrange[i].doctorInfo[0].name;
          let date = [];
          let date_obj = {};
          date_obj._id = arrange[i]._id;
          date_obj.value = arrange[i].start_time+'-'+arrange[i].end_time;
          date.push(date_obj);
          arr_obj.date = date;
          arr.push(arr_obj);
          o.data = arr;
          array.push(o);
        }
      }
      //console.log(array);
    }
    return array;
  }

  // ----------------------------------- 返回排班安排-----------
  router.post('/arrange/list',async(req, res) => {
    const {hospital_id,doctor_id,date} = req.body;
    const date_rule = new RegExp("^"+date);

    if(doctor_id == 'all') {
      await ArrangeModel.aggregate([
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctor_id',
            foreignField: '_id',
            as: 'doctorInfo'
          }
        },
        {
          $match: {
            'hospital_id': mongoose.Types.ObjectId(hospital_id),
            'day':date_rule
          }
        }
      ],function(err,docs){
        if(err) {
          console.log(err);
          return;
        }else{
          let result = formatArrange(docs);
          res.send(result);
        }
      })
      // await ArrangeModel.find({hospital_id,day:date_rule},function(err,docs){
      //   if(err) {
      //     console.log(err);
      //     return;
      //   }else{
      //     console.log(docs);
      //     res.send(docs);
      //   }
      // })
    }else {
      await ArrangeModel.aggregate([
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctor_id',
            foreignField: '_id',
            as: 'doctorInfo'
          }
        },
        {
          $match: {
            'hospital_id': mongoose.Types.ObjectId(hospital_id),
            'doctor_id': mongoose.Types.ObjectId(doctor_id),
            'day':date_rule
          }
        }
      ],function(err,docs){
        if(err) {
          console.log(err);
          return;
        }else{
          let result = formatArrange(docs);
          res.send(result);
        }
      })
    }
    // res.send({hospital_id,doctor_id,date});
  })


  // ------------------------- 返回某个排班信息--------
  router.get('/arrange/item/:_id',async(req,res) => {
    const _id = req.params._id;
    await ArrangeModel.findById(_id,function(err,docs){
      if(err) {
        return console.log(err);
      }else {
        res.send(docs);
      }
    })
  });


  // ----------------------------更新某个排班信息-------------------
  router.put('/arrange/edit',async(req,res) => {
    console.log(req.body);
    const _id = req.body._id;
    const model = req.body.model;
    await ArrangeModel.updateOne({_id},model,function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
    //res.send(req.body);
  })

  
  // -------------------------删除某个排班--------------------
  router.delete('/arrange/delete/:_id',async(req,res)=>{
    const _id = req.params._id;
    await ArrangeModel.deleteOne({_id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send('ok');
    })
  })

  //-------------------------查看某天(某天后的全部，全部)某医生(全部医生)的预约订单
  router.post('/order/list',async(req,res) => {
    const {hospital_id,doctor_id,day} = req.body;
    console.log('day',typeof day);
    if(day == 'all') {
      if(doctor_id == 'all') {
        console.log('all');
        await ArrangeModel.aggregate([
          {
            $match: {
              'hospital_id': mongoose.Types.ObjectId(hospital_id)
            }
          },
          {
            $lookup: {
              from: 'orders',
              localField: '_id',
              foreignField: 'arrange_id',
              as: 'orderList'
            }
          },
          {
            $lookup: {
              from: 'patients',
              localField: 'orderList.patient_id',
              foreignField: '_id',
              as: 'patientInfo'
            }
          }
        ],function(err,docs){
          if(err) {
            return console.log(err);
          }
          console.log(docs);
          res.send(docs);
        })
      }else{
        await ArrangeModel.aggregate([
          {
            $match: {
              'hospital_id': mongoose.Types.ObjectId(hospital_id),
              'doctor_id': mongoose.Types.ObjectId(doctor_id)
            }
          },
          {
            $lookup: {
              from: 'orders',
              localField: '_id',
              foreignField: 'arrange_id',
              as: 'orderList'
            }
          },
          {
            $lookup: {
              from: 'patients',
              localField: 'orderList.patient_id',
              foreignField: '_id',
              as: 'patientInfo'
            }
          }
        ],function(err,docs){
          if(err) {
            return console.log(err);
          }
          console.log(docs);
          res.send(docs);
        })
      }
    }else {
      if(doctor_id == 'all') {
        console.log('all');
        await ArrangeModel.aggregate([
          {
            $match: {
              'hospital_id': mongoose.Types.ObjectId(hospital_id),
              'day': day
            }
          },
          {
            $lookup: {
              from: 'orders',
              localField: '_id',
              foreignField: 'arrange_id',
              as: 'orderList'
            }
          },
          {
            $lookup: {
              from: 'patients',
              localField: 'orderList.patient_id',
              foreignField: '_id',
              as: 'patientInfo'
            }
          }
        ],function(err,docs){
          if(err) {
            return console.log(err);
          }
          console.log(docs);
          res.send(docs);
        })
      }else{
        await ArrangeModel.aggregate([
          {
            $match: {
              'hospital_id': mongoose.Types.ObjectId(hospital_id),
              'doctor_id': mongoose.Types.ObjectId(doctor_id),
              'day': day
            }
          },
          {
            $lookup: {
              from: 'orders',
              localField: '_id',
              foreignField: 'arrange_id',
              as: 'orderList'
            }
          },
          {
            $lookup: {
              from: 'patients',
              localField: 'orderList.patient_id',
              foreignField: '_id',
              as: 'patientInfo'
            }
          }
        ],function(err,docs){
          if(err) {
            return console.log(err);
          }
          console.log(docs);
          res.send(docs);
        })
      }
    }
    
  })


  // ------------------------- 添加检查项目----------------
  router.post('/exam/add',async(req,res)=>{
    const data = req.body;
    await ExamModel.create(data,function(err,docs) {
      if(err) {
        console.log(err);
        res.status(422).send('添加失败');
        return;
      }else {
        res.send('添加成功');
      }
    })
  })

  // --------------------------- 获取某诊所的检查项目------------
  router.post('/exam/list',async(req,res)=>{
    const hospital_id = req.body.hospital_id;
    await ExamModel.find({hospital_id},function(err,docs) {
      if(err) {
        return console.log(err);
      }else {
        res.send(docs);
      }
    })
  })

  // ---------------------------- 修改检查项目 -----------------
  router.put('/exam/edit/:_id',async(req,res)=>{
    const _id = req.params._id;
    const data = req.body;
    await ExamModel.updateOne({_id},data,function(err,docs) {
      if(err) {
        return console.log(err);
      }else {
        res.send('修改成功')
      }
    })
  })

  // ----------------------------- 删除检查项目 ------------------
  router.delete('/exam/delete/:_id',async(req,res)=>{
    const _id = req.params._id;
    await ExamModel.deleteOne({_id},function(err,docs){
      if(err) {
        return console.log(err);
      }else {
        res.send('删除成功');
      }
    })
  })

  // ------------------------- 添加药品----------------
  router.post('/medic/add',async(req,res)=>{
    const data = req.body;
    await MedicModel.create(data,function(err,docs) {
      if(err) {
        console.log(err);
        res.status(422).send('添加失败');
        return;
      }else {
        res.send('添加成功');
      }
    })
  })

  // --------------------------- 获取某诊所的药品------------
  router.post('/medic/list',async(req,res)=>{
    const hospital_id = req.body.hospital_id;
    await MedicModel.find({hospital_id},function(err,docs) {
      if(err) {
        return console.log(err);
      }else {
        res.send(docs);
      }
    })
  })

  // ---------------------------- 修改药品 -----------------
  router.put('/medic/edit/:_id',async(req,res)=>{
    const _id = req.params._id;
    const data = req.body;
    await MedicModel.updateOne({_id},data,function(err,docs) {
      if(err) {
        return console.log(err);
      }else {
        res.send('修改成功')
      }
    })
  })

  // ----------------------------- 删除药品 ------------------
  router.delete('/medic/delete/:_id',async(req,res)=>{
    const _id = req.params._id;
    await MedicModel.deleteOne({_id},function(err,docs){
      if(err) {
        return console.log(err);
      }else {
        res.send('删除成功');
      }
    })
  })


  // ---------------------- 添加病历---------------------
  router.post('/history/add',async(req,res) => {
    const data = req.body;
    const order_id = data.order_id;
    await HistoryModel.create(data,function(err,docs) {
      if(err) {
        res.send('error');
        return console.log(err);
      }
      
      OrderModel.updateOne({'_id':order_id},{'status': 1},function(err,docs){
        if(err) {
          res.send('error');
          return console.log(err);
        }
        res.send('add history is ok');
      })
    })

  })

  // ---------------------------- 使用了药品，修改药品数量 -----------------
  router.put('/medic/editnumber/:_id',async(req,res)=>{
    const _id = req.params._id;
    const subnumber = req.body.number;
    console.log('subnumber',subnumber);
    await MedicModel.findById({_id}, function(err,docs) {
      if(err) {
        return console.log(err);
      }
      console.log(docs);
      let number = docs.number;
      console.log('number',number);
      let value = number - subnumber;
      console.log('value',value);
      MedicModel.updateOne({_id},{'number':value},function(err,docs) {
        if(err) {
          return console.log(err);
        }else {
          res.send('修改成功')
        }
      })
    })
    
  })


  router.post('/patient/list',async(req,res)=>{
    const hospital_id = req.body.hospital_id;
    await Hospital_PatientModel.aggregate([
      {
        $match: {
          'hospital_id': mongoose.Types.ObjectId(hospital_id)
        }
      },
      {
        $lookup: {
          from: 'patients',
          localField: 'patient_id',
          foreignField: '_id',
          as: 'patientInfo'
        }
      }
    ],function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })
  })

  // 病人历史记录
  router.post('/history',async(req,res)=>{
    const patient_id = req.body.patient_id;
    const hospital_id = req.body.hospital_id;
    await HistoryModel.find({hospital_id,patient_id},function(err,docs){
      if(err) {
        return console.log(err);
      }
      res.send(docs);
    })

  })
  app.use('/hospital/api',router);


  
}