<template>
	<div class="arrange">
		<div class="operate">
			<div class="choose_doctor">
				<!-- 所有人 -->
				<label>查看排班：</label>
				<el-select v-model="doctor_id" placeholder="所有医生">
					<el-option key="all" label="全部医生" value="all">
					</el-option>
					<el-option v-for="item of doctor_options" :key="item._id" :label="item.name" :value="item._id">
					</el-option>
				</el-select>
			</div>
			<div class="btns">
				<label>选择日期进行操作：</label>
				<el-button type="primary" @click="openDialogAddArrange">新增排班</el-button>
				<el-button type="warning">编辑排班</el-button>
				<el-button type="danger">删除排班</el-button>
			</div>
		</div>
		<el-calendar class="calendar" date=""  v-model="showdate">
		  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
		  <template
		    slot="dateCell"
		    slot-scope="{date, data}"
				>
		    <div style="height:100%" :class="data.isSelected ? 'is-selected' : ''"  @click="clickDay(data.day)">
		      <div class="showday">{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}</div>
					<div v-for="item of anpai">
						<div v-if="item.day == data.day">
							<div v-for="i of item.data" :key="i.doctor_id" class="plan-item">
								<span>{{i.doctorName}}:</span>
								<div v-for="d of i.date" class="date-item">
									{{d.value}}
								</div>
							</div>
						</div>
					</div>
					<!-- <span v-if="data.day == ">-->
		    </div>
		  </template>
		</el-calendar>

		<!-- 点击新增排班时的弹出框 -->
		<el-dialog title="新增排班" :visible.sync="dialogAddArrange">

				<!-- 弹话框内容 -->
				<el-form :model="doctor_arrange" label-position="left">


							<!-- 科室 -->
							<!-- <el-form-item label="科室:" >
									<el-select v-model="form.office_selected" placeholder="科室" style="width:100px;">
											<el-option v-for="item in form.office" :value="item.text">
											</el-option>
									</el-select>
							</el-form-item> -->
					

					<!-- 医生 -->
					<el-form-item label="医生:" label-width="80px">
						<el-select v-model="doctor_arrange.doctor_id"  style="width:200px;">
							<el-option v-for="item of doctor_options" :key="item._id" :label="item.name" :value="item._id">
							</el-option>
						</el-select>
					</el-form-item>


					<!-- 号段时长 -->
					<!-- <el-form-item label="号段时长:" >
							<el-select v-model="form.time[0].time_long"  style="width:100px;">
									<el-option v-for="item in form.time" :value="item.time_long">
									</el-option>
							</el-select>
					</el-form-item> -->


							<!-- 复选框：允许线上预约 -->
							<!-- <el-form-item>
									<el-checkbox v-model="form.checked">
											允许线上预约(如果系统对接了线上挂号App、微信服务号等)
											<br>
											<i style="opacity:.7;">如果不希望医生排班对外开放只允许电话预约，则取消勾选</i>
									</el-checkbox>
							</el-form-item> -->

					<el-form-item label="日期：" label-width="80px">
						<el-input
							v-model="doctor_arrange.day"
							:disabled="true"
							suffix-icon="el-icon-date"
							style="width: 200px;">
						</el-input>
					</el-form-item>
					<!-- 排班时段 -->
					<el-form-item label="排班时段:" label-width="80px">
							<!-- 日选择 -->
							<!-- <el-date-picker v-model="doctor_arrange.day" type="date" placeholder="选择日期" :picker-options="active_day"></el-date-picker> -->

							<!-- 时间段选择 -->
							<el-time-select placeholder="起始时间" v-model="doctor_arrange.start_time":picker-options="{
											start: '08:30',
											step: '00:15',
											end: '18:30'
										}">
							</el-time-select>			  		     	 
							<el-time-select placeholder="结束时间" v-model="doctor_arrange.end_time" :picker-options="{
										start: '08:30',
										step: '00:15',
										end: '18:30',
										minTime: doctor_arrange.start_time
									}">
							</el-time-select>
					</el-form-item>
					<el-form-item label="挂号费：" label-width="80px">
						<el-input
							v-model="doctor_arrange.money"
							style="width: 200px;">
						</el-input>
					</el-form-item>
					<el-form-item label="数量：" label-width="80px">
						<el-input
							v-model.number="doctor_arrange.number"
							style="width: 200px;">
						</el-input>
					</el-form-item>
				</el-form>
			

				<!-- 弹话框的低下两个按钮 -->
				<div slot="footer" class="dialog-footer">
						<el-button @click="dialogAddArrange = false">取 消</el-button>
						<el-button type="primary" @click="addArrange">确 定</el-button>
				</div>
		</el-dialog>
		<router-view></router-view>
	</div>
</template>

<script>
	var myDate = new Date();
	import Vue from 'vue'; 
  	export default {
	    data () {
	     	 return {
					showdate: new Date(),
	     	 	doctor_options: this.$store.state.doctorList,
					doctor_id: 'all',
					active_day: '',
					dialogAddArrange: false,
					doctor_arrange: {
						hospital_id: this.$store.state.hospitalInfo._id,
						doctor_id: '',
						day: '',
						start_time: '',
						end_time: '',
						money: '',
						number: ''
					},
					anpai:[
						// {
						// 	day:'2020-04-02',
						// 	data:[
						// 		{doctor_id:'123',doctorName:'黄医生',date:[{_id:'',value:'09:30-10:30'},{_id:'',value:'09:30-10:30'}]},
						// 		{doctor_id:'212',doctorName:'吴医生',date:[{_id:'',value:'09:30-10:30'}]},
						// 		{doctor_id:'333',doctorName:'刘医生',date:[{_id:'',value:'09:30-10:30'}]},
						// 		{doctor_id:'444',doctorName:'刘医生',date:[{_id:'',value:'09:30-10:30'}]},
						// 		{doctor_id:'555',doctorName:'刘医生',date:[{_id:'',value:'09:30-10:30'}]}
						// 	]
						// },
						// {
						// 	day:'2020-04-04',
						// 	data:[
						// 		{doctor_id:'1213',doctorName:'黄医生',date:[{_id:'',value:'09:30-10:30'}]}
						// 	]
						// }
					]
	     	}
			},
			watch:{
				showdate(val,old_val) {
					const new_date = this.$moment(val).format('YYYY-MM-');
					const old_date = this.$moment(old_val).format('YYYY-MM-');
					if(new_date != old_date) {
  					this.getArrange();
					}
				},
				doctor_id(val) {
					this.getArrange();
				}
			},
			// -------------------------- 挂载时---------
	    mounted(){
				this.getArrange();
			},
	    methods:{
				// ------------------------------ 点击的日期---------------------
				clickDay(day){
					this.doctor_arrange.day = day;
					this.active_day = day;
					//console.log(day);
				},

				// --------------------------------- 点击新增排班,打开弹窗--------------------------
				openDialogAddArrange(){
					const day = this.active_day;
					if(!day) {
						this.$message({
							type: 'warning',
							message: '请选择日期'
						})
					}else {
						this.dialogAddArrange = true;
					}
				},

				// ---------------------------------- 点击  确认 添加排班 ----------------------
				addArrange(){
					if(this.doctor_arrange.doctor_id == '' || this.doctor_arrange.start_time == '' || this.doctor_arrange.end_time == '' || this.doctor_arrange.money == '' || this.doctor_arrange.number == '') {
						this.$message({
							type: 'error',
							message: '请补充完整排班信息'
						})
					}else {
						this.$request.post('/arrange/add',this.doctor_arrange).then(res=>{
							this.$message({
								type: 'success',
								message: '新增排班成功'
							})
							this.dialogAddArrange = false;
							this.doctor_arrange = { 
								hospital_id: this.$store.state.hospitalInfo._id,
								doctor_id: '',
								day: '',
								start_time: '',
								end_time: '',
								money: '',
								number: ''
							}
							console.log(res.data);
							this.getArrange();
						})
					}
				},

				// ---------------------------------获取医生排班列表-------------
				getArrange(){
					const hospital_id = this.$store.state.hospitalInfo._id;
					const doctor_id = this.doctor_id;
	 				
					//console.log(this.$moment(this.date).format('YYYY-MM-'));
					const date = this.$moment(this.showdate).format('YYYY-MM-')
					this.$request.post('/arrange/list',{hospital_id,doctor_id,date}).then(res=>{
						console.log(res.data);
						console.log('---------');
						this.anpai = res.data;
						// this._handleArrange(res.data);
					})
				},


			},
			
			
	}
</script>

<style>
.arrange .calendar {
	margin-left: 15px;
	margin-right: 15px;
	min-width: 1033px;
}

.arrange .operate {
	margin: 15px;
	overflow: hidden;
}

.arrange .operate .choose_doctor {
	float: left;
}

.arrange .operate .btns {
	float: left;
	margin-left: 40px;
}

.arrange .is-selected {
	color: #1989FA;
}

.arrange .showday {
	font-size: 12px;
	font-weight: bold;
	text-align: right;
	float: right;
	width: 30%;
}

.arrange .plan-item {
	font-size: 10px;
	float: left;
	width: 70%;
}

.arrange .date-item {
	margin-left: 30px;
}


.arrange .el-calendar-table .el-calendar-day {
	min-width: 150px;
	height: 80px;
}
</style>