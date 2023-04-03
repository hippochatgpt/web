<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  created() {
    this.checkDeviceType()
  },
  methods: {
    checkDeviceType() {
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        // 当前设备是移动设备
        this.$router.push('/app')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
