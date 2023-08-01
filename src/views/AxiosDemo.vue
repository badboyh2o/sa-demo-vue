<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src

/**
 * axios请求方法
 * delete	删除数据
 * 
 * get	获取数据
 * post	提交数据
 * put	更新数据（所有数据）
 * patch	更新数据（只修改的部分）
 * 
 */




import axios from 'axios'

export default {
  name: 'AxiosDemo',
  components: {
  },
  // 生命周期 created 之后发起一个http请求，这里使用本地数据 data.json 模拟远程数据
  created: function () {
	/*
	// /data.json?id=12
	axios.get('/data.json', {
		params: {
			id: 12
		}
	}).then((res) => {
		console.log(res)
	})
	*/
   
	axios({
		method: 'get',
		url: '/data.json',
		params: {
			id: 12
		}
	}).then(res => {
		console.log(res)
	})
	
	axios({
		method: 'post',
		url: 'post/json',
		data: {
			id: 12
		}
	}).then(res => {
		console.log(res)
	})
	
	
	var formData = new formData()
	formData.append("id", 12)
	axios.post('post/form', formData).then((res) => {
		console.log(res)
	})
	
  },
  
  
  
  
}
</script>
