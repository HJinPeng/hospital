<template>
	<div class="inOne-records">
		<el-form ref="form" :model="record" label-width="80px">
			<el-form-item label="主诉:">
				<el-input
					type="textarea"
					:rows="5"
					placeholder="请输入内容"
					v-model="record.talk">
				</el-input>
			</el-form-item>
			<el-form-item label="现病史:">
				<el-input
					type="textarea"
					:rows="5"
					placeholder="请输入内容"
					v-model="record.now">
				</el-input>
			</el-form-item>
			<el-form-item label="体格检查:">
				<el-input
					type="textarea"
					:rows="5"
					placeholder="请输入内容"
					v-model="record.physique">
				</el-input>
			</el-form-item>
			<el-form-item label="诊断:">
				<el-input
					type="textarea"
					:rows="5"
					placeholder="请输入内容"
					v-model="record.handle">
				</el-input>
			</el-form-item>
			<el-form-item style="text-align:right;">
				<el-button  @click="saveData()" type="primary"><i class="fa fa-floppy-o"></i> 保存</el-button>
				<el-button @click="resetData()" type="warning"><i class="fa fa-pencil" aria-hidden="true"></i> 重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				record: {
					talk: '',
					now: '',
					physique: '',
					handle: ''
				},
			}
		},
		methods:{
			saveData(){
				this.$confirm('确认保存吗？', '提示', {}).then(() => {
					this.$message({
						type: 'success',
						message: '保存成功'
					});
				}).catch(() => {
					this.$message({
							type: 'info',
							message: '已取消保存'
					}); 
				});	
			},
			resetData(){
				this.$confirm('确认重置？', '提示', {}).then(() => {
					this.$message({
						type: 'success',
						message: '重置成功'
					});
					this.record = {
						talk: '',
						now: '',
						physique: '',
						handle: ''
					}
				}).catch(() => {
					
			});	
			}
		}
	}
</script>

<style scoped>
.inOne-TabRecords{
	padding-top: 30px;
	padding-bottom: 30px;
	border-bottom: 1px solid #dcdcdc;
}
</style>