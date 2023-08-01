<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  // 生命周期 created 之后发起一个http请求，这里使用本地数据 data.json 模拟远程数据
  created: function () {

	axios.get('/data.json').then((res) => {
		console.log(res)
	})
  }
}
</script>
