<template >
	<div class="Mrliu">
		<div class="h-content">
			<div class="content-left" >
				<el-menu default-active="all" class="el-menu-vertical-demo" style="background-color: #ffffff;" >
					<el-menu-item index="all" @click="chooseDoctor('all')">全部医生</el-menu-item>
					<!-- <router-link to="/home/reservation/Mrliu/Visdoctor" style="text-decoration:none;color:#48576a;">
							<el-menu-item index="1">出诊医生</el-menu-item>
					</router-link>     -->
					<el-menu-item v-for="item of doctor_options" :key="item._id" :index="item._id" @click="chooseDoctor(`${item._id}`)">{{item.name}}</el-menu-item>
					<!-- <router-link to="/home/reservation/Mrliu/liuContent" style="text-decoration:none;color:#48576a;">
						<el-menu-item index="2">刘医生</el-menu-item>
					</router-link>  -->
					<!-- <el-menu-item index="3">李医生</el-menu-item>
					<el-menu-item index="4">张医生</el-menu-item>
					<el-menu-item index="5">王医生</el-menu-item> -->
				</el-menu>
			</div>

			<div class="content-right">
				<div class="status">
					<span>订单状态：</span>
					<el-checkbox-group class="checkbox" v-model="checkList" @change="filterOrder">
						<el-checkbox label="wait">待诊</el-checkbox>
						<el-checkbox label="past">过期</el-checkbox>
						<el-checkbox label="finish">完成</el-checkbox>
					</el-checkbox-group>
				</div>
				<div class="order_list">
					<visdoctor :tableData="show_order_list"/>
				</div>
			</div> 
		</div>
	</div>
		
</template>

<script>
// import "../../assets/css/style1.css"
import moment from 'moment'
import Visdoctor from './Visdoctor'
	//npm i element-ui -S 等同于
	//npm install element-ui --save
	export default {
	  name: 'Mrliu',
	  data() {
	    return {
				doctor_options: this.$store.state.doctorList,
				checkList: ['wait'],
				order_list: [],
				show_order_list: []
	    }
	  },
		components:{
			Visdoctor
		},
		mounted(){
			// 默认选择全部医生的订单
			this.chooseDoctor('all');
			// this.show_order_list = [];
			// this.checkList = ['wait'];
		},
	  methods:{
			// 选择医生
			chooseDoctor(doctor_id){
				console.log(doctor_id);
				this.order_list = [];
				const hospital_id = this.$store.state.hospitalInfo._id;
				const day = moment(new Date()).format('YYYY-MM-DD');
				console.log(day);
				this.$request.post('/order/list',{hospital_id,doctor_id,day}).then(res=>{
					console.log(res);
					const data = res.data;
					for(let i = 0 ; i < data.length; i++) {
						let arrange_id = data[i]._id;
						let doctor_id = data[i].doctor_id;
						let time = data[i].start_time + '~' + data[i].end_time;
						let orderList =  data[i].orderList;
						let patientInfo =  data[i].patientInfo;
						for(let j = 0 ; j < orderList.length ; j++) {
							let o = {};
							o.arrange_id = arrange_id;
							o.doctor_id = doctor_id;
							o.time = time;
							o.order_id = orderList[j]._id;
							o.patient_id = orderList[j].patient_id;
							o.status = orderList[j].status;
							o.buy_time = orderList[j].time;
							o.name = patientInfo[j].name;
							o.phone = patientInfo[j].phone;
							o.age = patientInfo[j].age;
							o.allergy = patientInfo[j].allergy;
							o.heart = patientInfo[j].heart;
							o.height = patientInfo[j].height;
							o.image = patientInfo[j].image;
							o.pressure = patientInfo[j].pressure;
							o.sex = patientInfo[j].sex;
							o.temperature = patientInfo[j].temperature;
							o.weight = patientInfo[j].weight;
							o.test_time = patientInfo[j].time;
							this.order_list.push(o);
						}
					}
					this.filterOrder();
				})
				// 调用过滤条件
				//this.show_order_list = [];
				
			},

			// 过滤数据，待诊/过期/完成
			filterOrder(){
				let now = moment(new Date()).format('HH:mm');
				let wait = this.checkList.indexOf('wait') == -1 ? false: true;
				let past = this.checkList.indexOf('past') == -1 ? false: true;
				let finish = this.checkList.indexOf('finish') == -1 ? false: true;
				if(this.checkList.length == 3) {
					this.show_order_list = JSON.parse(JSON.stringify(this.order_list));
				}else if(this.checkList.length == 2) {
					this.show_order_list = [];
					if(!wait) {
						console.log('past finish');
						// 选中了past finish
						this.order_list.forEach((item)=>{
							if(item.status == 1 || (item.status == 0 && now > item.time.substring(6,11))) {
								this.show_order_list.push(item);
							}
						})
					}else if(!past) {
						// 选中了wait finish
						console.log('wait finish');
						this.order_list.forEach((item)=>{
							if(item.status == 1 || (item.status == 0 && now <= item.time.substring(6,11))) {
								this.show_order_list.push(item);
							}
						})
					}else {
						// 选中了wait past
						console.log('wait past');
						console.log(this.order_list);
						console.log(this.order_list.length);
						this.order_list.forEach((item)=>{
							if(item.status == 0) {
								this.show_order_list.push(item);
							}
						})
					}
				}else if(this.checkList.length == 1) {
					this.show_order_list = [];
					if(wait) {
						this.order_list.forEach((item)=>{
							if(item.status == 0 && now <= item.time.substring(6,11)) {
								this.show_order_list.push(item);
							}
						})
					}else if(past) {
						this.order_list.forEach((item)=>{
							if(item.status == 0 && now > item.time.substring(6,11)) {
								this.show_order_list.push(item);
							}
						})
					}else {
						this.order_list.forEach((item)=>{
							if(item.status == 1) {
								this.show_order_list.push(item);
							}
						})
					}
				}else {
					this.show_order_list = [];
				}
			}
	  }
	}
</script>

<style scoped>
.Mrliu .h-content{
	display: flex;
	min-height: 500px;
	margin-top: 1%;
}
.Mrliu .h-content .content-left{
	height: 100%;
	width: 15%;
	/* float: left; */
	background-color: #ffffff;
	/* margin-left: 1%; */
	/* margin-top: 1px; */
}

.Mrliu .h-content .content-right{
	/* height: 100%; */
	/* float: left; */
	width: 84%;
	margin-left: 1%;
	background-color: #ffffff;
}

.Mrliu .h-content .status {
	/* float: right; */
	margin-top: 20px;
	margin-left: 20px;
}

.Mrliu .h-content .checkbox {
	display: inline-block;
	padding-left: 10px;
}

.Mrliu .h-content .order_list {
	padding: 20px;
}
</style>