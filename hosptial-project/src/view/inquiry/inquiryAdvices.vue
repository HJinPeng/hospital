<template>
	<div class="advices">
		<div class="inOne-advice">
		  <el-button type="primary" @click="handleAdd()">添加医药信息</el-button>
		</div>
		<!-- 列表 -->
		<div class="inOne-table">
		  <el-table :data="tableData"  style="width: 100%">
		    <el-table-column align="center"  label='组号' width="50">
					<template scope="scope">
						{{ scope.row.groupIndex}}
		      </template>
		    </el-table-column>
		    <el-table-column  align="center"  label='名称(规格)' width="110">
					<template scope="scope">
						{{ scope.row.drugName }}
		      </template>
		    </el-table-column>
				<el-table-column  align="center"  label='药品ID' width="100" show-overflow-tooltip>
					<template scope="scope">
						{{ scope.row.drugId}}
		      </template>
		    </el-table-column>
		    <el-table-column align="center" label='天数' width="50">
					<template scope="scope">
						{{ scope.row.days }}
		      </template>
		    </el-table-column>
		    <el-table-column align="center"  label='数量' width="50">
					<template scope="scope">
						{{ scope.row.numbers }}
		      </template>
		    </el-table-column>
		    <el-table-column align="center" label='单价' width="60">
					<template scope="scope">
						{{ scope.row.price }}
		      </template>
		    </el-table-column>
				<el-table-column align="center"  label='备注'>
					<template scope="scope">
						{{ scope.row.remarks }}
		      </template>
		    </el-table-column>
		    <el-table-column label="操作" width="160">
		      <template scope="scope">
		      	<el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
		        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>		        
		      </template>
		    </el-table-column>
		  </el-table>
		</div>	
		<div class="operate">
			<el-button type="primary" @click="save()">保存</el-button>
		</div>	
		<!--新增界面-->
		<div>
			<el-dialog title="表单新增" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
				<el-form label-position="left" label-width="90px" style='width: 400px; margin-left:50px;'
					:model="addform">
					<el-form-item label="组号">
						<el-select v-model="addform.groupIndex" placeholder="组号">
							<el-option v-for="item in values" :key="item.value" v-model="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="名称(规格)">
						<el-select v-model="addform.drugId" filterable placeholder="请选择" @change="selectDrug(addform.drugId)">
							<el-option
								v-for="item in medicList"
								:key="item._id"
								:label="item.name"
								:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="天数">
						<el-input-number :min="1" v-model="addform.days"></el-input-number>
					</el-form-item>
					<el-form-item label="数量">
						<el-input-number :min="1" v-model="addform.numbers"></el-input-number>
					</el-form-item>
					<el-form-item label="单价(元)">
						<el-input v-model="addform.price" disabled></el-input>
					</el-form-item>
					<el-form-item label="备注">
							<el-input v-model="addform.remarks" type="textarea"></el-input>
					</el-form-item>
				</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="handleSubmit()">确定</el-button>
						<el-button @click="addCancel()">取消</el-button>
					</div>
				</el-dialog>
   		</div>		
    </div>
</template>

<style scoped>
.advices .inOne-Bottom{
	margin-top: 20px;
}
.advices .toolbarBottom{
	padding: 0 !important;
}
.advices .operate {
	margin-top: 10px;
}
</style>

<script>
export default {
	data() {
    	return {
				medicList: this.$store.state.medicList,
				tableData: [],
				dialogFormVisible: false,
				values:[{
					value:'001'
				},{
					value:'002'
				},{
					value:'003'
				},{
					value:'004'
				},{
					value:'005'
				},{
					value:'006'
				},{
					value:'007'
				}],
				//新增界面数据
				addform: {
					groupIndex:'001',
					drugName: '',
					drugId: '',
					days: null,
					numbers: null,
					price: null,
					remarks: null
				},
				selectData: [],
				editActive: false,
				editIndex: null
    	}
		},
		mounted() {
  		
		},
		methods:{
			selectDrug(drugId){
				console.log(drugId);
				for(let i = 0 ; i < this.medicList.length; i++) {
					if(this.medicList[i]._id == drugId) {
						this.addform.drugName = this.medicList[i].name;
						this.addform.price = this.medicList[i].price;
						break;
					}
				}
			},
    	//删除
    	handleDelete(index, row) {
    		this.$confirm('确认删除吗？', '提示', {}).then(() => {
    			this.$message({
    				type: 'success',
    				message: '删除成功'
    			});
    			this.tableData.splice(index,1)
    		}).catch(() => {
    			this.$message({
    			    type: 'info',
    			    message: '已取消删除'
    			}); 
				});	
    	},
    	//新增界面显示
    	handleAdd(){
				this.editActive = false;
				this.editIndex = null;
    		this.dialogFormVisible = true;
    		//再次新增时，初始化
    		this.addform = {
					groupIndex:'001',
					drugName: '',
					drugId: '',
					days: null,
					numbers: null,
					price: null,
					remarks: null
				}
    	},
    	//弹窗里的确定提交按钮
    	handleSubmit(){
				if(this.addform.drugName == '' || this.addform.days == null || this.addform.numbers == null) {
					this.$message({
						type: 'warning',
						message: '请补充完成信息'
					})
				}else {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.$message({
							type: 'success',
							message: '提交成功'
						});
						if(this.editActive) {
							this.tableData[this.editIndex] = this.addform;
						}else {
							this.tableData.push(this.addform);
						}
						this.dialogFormVisible = false;
					}).catch(() => {
					});	
				}
    	},
    	//新增界面里的取消按钮
    	addCancel(){
    		this.dialogFormVisible = false;
    	},
    	//编辑界面显示
    	handleEdit(index, row) {
				console.log(index,row);
				this.addform = row;
				this.editIndex = index;
				this.editActive = true;
				this.dialogFormVisible = true;
    	}
		},
		save(){

		}
  	
}
</script>