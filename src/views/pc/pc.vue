<template>
  <div class="home-wrapper">
    <Chatbar />
    <Chat />
  </div>
</template>
<script>
import Chatbar from './components/Chatbar.vue'
import Chat from './components/Chat.vue'
export default {
  name: 'home',
  components: { Chatbar, Chat }
}
</script>
<style lang="scss" scoped>
.home-wrapper {
  height: 100vh;
  min-width: 1200px;
  @include flex-align;
}
</style>
