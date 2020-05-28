<template>
	<div class="inOne-pay">
		<div>
			<el-table :data="drugDatas" border style="width: 100%">
				<el-table-column align="center" label='分类' width="80" >
					<template scope="props">
						{{ props.row.name }}
					</template>
				</el-table-column>
				<el-table-column align="center" label='项目' show-overflow-tooltip>
					<template scope="props">
						{{ props.row.value }}
					</template>
				</el-table-column>
				<el-table-column align="center" label='价钱(元)' width="80">
					<template scope="props">
						{{ props.row.price }}
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="AllTotal">
			<h2>总价：{{ allPrice }}</h2>
			<el-button type="success" @click="payData()" :disabled="allPrice == 0 ">缴费（结束就诊）</el-button>
		</div>
	</div>
</template>

<script>
	import {SET_CASE_ALL_PRICE,SET_CASE_INIT} from '../../store/mutations-types'
	export default {
		props:{
			beClick:{
				type: String
			}
		},
		watch:{
			beClick(val){
				if(val == 'fourth') {
					this.setDrugDatas();
				}
			}
		},
		data() {
			return {
				allPrice: 0,
				drugDatas: [
					{
						name: '检查费',
						value: '',
						price: 0
					},
					{
						name: '医药费',
						value: '',
						price: 0
					}
				]
			}
		},
		mounted(){
			this.setDrugDatas();
		},
		methods:{
			setDrugDatas(){
				const examPrice = this.$store.state.caseHistory.examPrice;
				const examItem = this.$store.state.caseHistory.examItem;
				const medicPrice = this.$store.state.caseHistory.medicPrice;
				const medicItem = this.$store.state.caseHistory.medicItem;
				this.drugDatas = [
					{
						name: '检查费',
						value: examItem,
						price: examPrice
					},
					{
						name: '医药费',
						value: medicItem,
						price: medicPrice
					}
				];
				this.allPrice = parseFloat((parseFloat(examPrice) + parseFloat(medicPrice)).toFixed(2));
				this.$store.commit(SET_CASE_ALL_PRICE,this.allPrice);
			},
			payData() {
				this.$confirm('确认缴费吗？', '提示', {}).then(() => {
					const medicChoose = this.$store.state.medicChoose;
					for(let i = 0 ; i < medicChoose.length ; i++) {
						let _id = medicChoose[i].drugId;
						let number = medicChoose[i].numbers;
						this.$request.put('/medic/editnumber/'+_id,{'number':number}).then(res=>{

							console.log(res);
						})
					}
					const case_history =  this.$store.state.caseHistory;
					this.$request.post('/history/add',case_history).then(res=>{
						console.log(res);
					})
					this.$message({
						type: 'success',
						message: '已缴费'
					});
					this.$router.push('/home/hello');
					this.$store.commit(SET_CASE_INIT);
				}).catch(() => {
					this.$message({
							type: 'info',
							message: '已取消缴费'
					}); 
			});	
		}
	}
}
</script>

<style>
	.active{
		background: blue;
	}
	.costDetail{
		font-weight: bold;
	}
	.AllTotal{
		margin-top: 50px;
	}
	.AllTotal h2{
		float: right;
		margin-right: 150px;
		color: #20a0ff;
		font-size: 20px;
	}
</style>