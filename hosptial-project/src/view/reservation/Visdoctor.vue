<template >
	<div class="Visdoctor">
		<template>
			<el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())|| data.phone.toLowerCase().includes(search.toLowerCase()))" border style="width: 100%;">
				<el-table-column label="时间" sortable :sort-method="sortTime">
					<template scope="scope">
						<el-icon name="time"></el-icon>
						<span style="margin-left: 10px">{{ scope.row.time }}</span>
					</template>
				</el-table-column>
				<el-table-column label="预约人">
					<template scope="scope">
						<div slot="reference" class="name-wrapper">
							<p>{{ scope.row.name }}</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="联系电话">
					<template scope="scope">
						<div slot="reference" class="name-wrapper">
							<p>{{ scope.row.phone }}</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column style="text-aligin:left;">
					<template slot="header" slot-scope="scope">
						<el-input
							v-model="search"
							size="mini"
							placeholder="输入姓名/电话关键字"/>
					</template>
					<template scope="scope">
						<div slot="reference">
							<span><router-link :to="{path: '/home/Inquiry'}"><el-button @click="toInquiry(`${scope.row.order_id}`)" type="text" :style="scope.row.status == 1 ? 'color:#5daf34':'color: #3a8ee6'"><i class="el-icon-document"></i> {{scope.row.status == 1 ? '查看':'问诊'}}</el-button></router-link></span>
						<!-- <span><el-button type="text"  @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-close"></i>  取消</el-button></span> -->
						</div>
					</template>
				</el-table-column>
			</el-table>
		</template>
	</div>
		
</template>
<script>	
  import {SET_INQUIRY} from '../../store/mutations-types'
	export default {
		name: 'visdoctor',
		props:{
			tableData: {
				type: Array
			}
		},
	  data() {
	    return {
				search:''
	    }
	  },
	
	  methods:{
			sortTime(a,b){
				console.log('a',typeof (a.time).substring(0,5));
				console.log('b',(b.time).substring(0,5));
				return (a.time).substring(0,5)>(b.time).substring(0,5)?1:-1;
			},
			toInquiry(order_id) {
				// const inquery = JSON.parse(JSON.stringify(data))
				const list = this.tableData;
				const length = list.length;
				for(let i = 0 ; i < length ; i++) {
					if(list[i].order_id == order_id) {
						console.log(list[i]);
						this.$store.commit(SET_INQUIRY,list[i]);
						break;
					}
				}
				// console.log('data',data);
				// this.$store.commit(SET_INQUIRY,data);
			}
			// flushCom(){
			// 	this.$router.go(0);
			// }
	  	// getData:function(){
	  	// 	// 这里可以写ajax方法
	  	// 	     let me = this;			
			// 		this.$http.get(api.testData).then(function(response){
			// 			// alert(0)
			// 			console.log(response)												
			// 			console.log("这是我们需要的json数据",response.data)
			// 			this.tableData = response.data;

			// 		}, function(response){
			// 			alert("请求失败了")
			// 		})
	  	// },
	  	// //点击取消
	  	// handleDelete (index, row) {
	  	//   this.tableData.splice(index, 1);
	  	//   this.$message({
	  	//     message: "操作成功！",
	  	//     type: 'success'
	  	//   });
	  	// },
	  },

	 mounted(){
	 			//  this.getData();
			}

	}
</script>

<style scoped>

	.Visdoctor .name-span span{
		margin-left: 25px;
	}
	.Visdoctor .name-wrapper{
		text-align: left;
	}
</style>