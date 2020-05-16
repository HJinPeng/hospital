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
				<el-button type="warning" @click="editArrange">编辑排班</el-button>
				<!-- <el-button type="danger">删除排班</el-button> -->
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
		<el-dialog :title="dialogArrangeTitle" :visible.sync="dialogAddArrange">
				<!-- 弹话框内容 -->
				<el-form :model="doctor_arrange" label-position="left">
					<!-- 医生 -->
					<el-form-item label="医生:" label-width="80px">
						<el-select v-model="doctor_arrange.doctor_id"  style="width:200px;">
							<el-option v-for="item of doctor_options" :key="item._id" :label="item.name" :value="item._id">
							</el-option>
						</el-select>
					</el-form-item>

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
		
		<el-dialog
			title="编辑排班"
			width="370px"
			:visible.sync="dialogEditArrange">
			<div v-for="doctor of day_arrange" :key="doctor.doctor_id">
				<h4>{{doctor.doctorName}}:</h4>
				<div v-for="item of doctor.date" :key="item._id" class="item">
					<span class="item_time">{{item.value}}</span>
					<el-button class="item_btn" type="primary" size="mini" @click="editArrangeInfo(item._id)">编辑</el-button>
					<el-button type="danger" size="mini" @click="deleteArrangeInfo(item._id)">删除</el-button>
				</div>
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
					dialogArrangeTitle: '新增排班',
					active_arrange_id:'',
					dialogAddArrange: false,
					dialogEditArrange: false,
					doctor_arrange: {
						hospital_id: this.$store.state.hospitalInfo._id,
						doctor_id: '',
						day: '',
						start_time: '',
						end_time: '',
						money: 0,
						number: 0
					},
					anpai:[],
					day_arrange: {}
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
						this.dialogArrangeTitle = '新增排班';
						this.dialogAddArrange = true;
					}
				},

				// ---------------------------------- 点击  确认 添加排班 ----------------------
				addArrange(){
					if(this.doctor_arrange.doctor_id == '' || this.doctor_arrange.start_time == '' || this.doctor_arrange.end_time == '') {
						this.$message({
							type: 'error',
							message: '请补充完整排班信息'
						})
					}else {
						if(this.dialogArrangeTitle == '新增排班') {
							this.$request.post('/arrange/add',this.doctor_arrange).then(res=>{
								this.$message({
									type: 'success',
									message: '新增排班成功'
								})
								this.dialogAddArrange = false;
								this.doctor_arrange = { 
									hospital_id: this.$store.state.hospitalInfo._id,
									doctor_id: '',
									day: this.active_day,
									start_time: '',
									end_time: '',
									money: 0,
									number: 0
								}
								console.log(res.data);
								this.getArrange();
							})
						}else {
							this.$request.put('/arrange/edit',{model:this.doctor_arrange,_id:this.active_arrange_id}).then(res=>{
								this.$message({
									type:'success',
									message: '更新成功'
								})
								this.dialogAddArrange = false;
								this.doctor_arrange = { 
									hospital_id: this.$store.state.hospitalInfo._id,
									doctor_id: '',
									day: '',
									start_time: '',
									end_time: '',
									money: 0,
									number: 0
								}
								console.log(res.data);
								this.getArrange();
							})
						}
						
					}
				},

				// ---------------------------------获取医生排班列表-------------
				getArrange(){
					const hospital_id = this.$store.state.hospitalInfo._id;
					const doctor_id = this.doctor_id;
	 				
					//console.log(this.$moment(this.date).format('YYYY-MM-'));
					const date = this.$moment(this.showdate).format('YYYY-MM-')
					this.$request.post('/arrange/list',{hospital_id,doctor_id,date}).then(res=>{
						//console.log(res.data);
						//console.log('---------');
						this.anpai = res.data;
						// this._handleArrange(res.data);
					})
				},

				// ------------------------------- 点击编辑医生按钮 ------------
				editArrange(){
					const length = this.anpai.length;
					for(let i = 0 ; i < length; i++) {
						if(this.anpai[i].day == this.active_day) {
							this.day_arrange = this.anpai[i].data;
							this.dialogEditArrange = true;
							return;
						}
					}

					// 如果该日期没有排班
					this.$message({
						type: 'warning',
						message: '该日期暂无排班'
					})
					return;
				},

				// --------------------------- 编辑排班信息------
				editArrangeInfo(_id){
					// 获取某个排班信息
					this.$request.get('/arrange/item/'+_id).then(res => {
						const data = res.data;
						this.doctor_arrange = { 
							hospital_id: this.$store.state.hospitalInfo._id,
							doctor_id: data.doctor_id,
							day: data.day,
							start_time: data.start_time,
							end_time: data.end_time,
							money: data.money,
							number: data.number
						}
						this.active_arrange_id = _id;
						this.dialogEditArrange = false;
						this.dialogArrangeTitle = '编辑排班';
						this.dialogAddArrange = true;
					});
				},

				deleteArrangeInfo(_id){
					this.$request.delete('/arrange/delete/'+_id).then(res=>{
						this.$message({
							type: 'success',
							message: '删除成功'
						})
						this.dialogEditArrange = false;
						this.getArrange();
					})
				}

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

.arrange .item {
	margin-bottom: 10px;
	min-width: 316px;
}

.arrange .date-item {
	margin-left: 30px;
}

.arrange .item_time {
	margin-left: 50px;
}

.arrange .item_btn {
	margin-left: 50px;
}


.arrange .el-calendar-table .el-calendar-day {
	min-width: 150px;
	height: 80px;
}

</style>