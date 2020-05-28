<template>
	<div class="personal">
		<h2 class="all">诊所信息</h2>
		<p class="name item"><span class="key">诊所名称： </span><span class="value">{{hospital.name}}</span></p>
		<p class="picture item"><span class="key">诊所图片： </span><span class="value"><img :src="hospital.picture" alt=""></span></p>
		<p class="intro item"><span class="key">诊所介绍： </span><span class="value">{{hospital.intro}}</span></p>
		<p class="good item"><span class="key">诊所擅长： </span><span class="value">{{hospital.good}}</span></p>
		<p class="address item"><span class="key">诊所地址： </span><span class="value">{{hospital.address}}</span></p>
		<p class="phone item"><span class="key">联系电话： </span><span class="value">{{hospital.phone}}</span></p>
		<p class="email item"><span class="key">诊所邮箱： </span><span class="value">{{hospital.email}}</span></p>
		<p class="people item"><span class="key">主负责人： </span><span class="value">{{hospital.administrator}}</span></p>
	</div>
</template>
<style scoped>
.personal {
	padding: 50px 300px;
	background: #fff;
}

.personal .all {
	margin-bottom: 20px;
	text-align: center;
}

.personal .item {
	padding-top: 10px;
	margin-bottom: 16px;
	display: flex;
}

.personal .item .key {
	display: inline-block;
	width: 150px;
	font-weight: bold;
}

.personal .item .value {
	text-align: left;
}

.personal .picture img{
	display: inline-block;
	width: 200px;
	height: auto;
}
</style>
<script>
	export default { 
		data() {
			return{
				hospital: this.$store.state.hospitalInfo
			}
		}
	}
</script>