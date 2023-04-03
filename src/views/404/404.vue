<template>
  <div class="not-found">
    <h3>您查找的内容不存在</h3>
    <p>
      <span>{{ countDown }}s</span>后为您回到首页
    </p>
  </div>
</template>
<script>
export default {
  name: '404',
  data() {
    return {
      countDown: 5,
      timer: null
    }
  },
  mounted() {
    this.initTimer()
  },
  methods: {
    initTimer() {
      this.timer = setInterval(() => {
        if (this.countDown < 1) {
          this.back()
        }
        this.countDown--
      }, 1e3)
    },
    back() {
      if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        // 当前设备是移动设备
        this.$router.push('/app')
      } else {
        this.$router.push('/')
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style scoped lang="scss">
.not-found {
  height: 100%;
  @include flex-align(center);
  flex-direction: column;
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  p {
    span {
      color: #f00;
    }
  }
}
</style>
