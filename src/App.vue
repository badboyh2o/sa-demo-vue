<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
	<br />
	<br />
	<button v-on:click="testClick()">测试</button>
  <!--
	<button v-on:click="testClick()">测试</button>
  -->
	
  </div>
  <router-view/>
</template>

<script>

  /*
	import { login } from '@/api/login'
	
	export default {
		methods: {
			testLogin: function testLogin() {
				login('admin', 'admin').catch((error) => alert(error));
			}
		}	
	}
  */


	export default {
		methods: {
			testClick: function testClick() {
        this.$sensors.track('buy', {
            ProductName: "MacBook Pro", 
            ProductPrice: 123.45, 
            IsAddedToFav: false,
        });
			}
		}	
	}



</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
