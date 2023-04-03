<template>
  <el-drawer :visible.sync="drawer" :with-header="false" direction="ltr" @closed="closed" size="80%">
    <div class="chat-bar">
      <div class="top">
        <button class="add-conversation" @click="addChat">
          <i class="el-icon-plus"></i>
          新建聊天
        </button>
      </div>
      <div class="content">
        <div class="conversation-list">
          <ul class="scrollbar" ref="scrollbar">
            <li v-for="item in conversationList" :key="item.id" :class="item.id === $store.state.activeConversation.id ? 'checked' : ''" @click="chooseConversion(item)">
              <i class="el-icon-chat-dot-square"></i>
              <template v-if="item.idEdit">
                <input type="text" v-model="item.chatName" maxlength="15" />
                <i class="el-icon-check action" @click.stop="editChat(item)"></i>
                <i class="el-icon-close action" @click.stop="item.idEdit = false"></i>
              </template>
              <template v-else>
                <div class="conversation-name">
                  <p>{{ item.chatName }}</p>
                  <div class="cover"></div>
                </div>
                <i class="el-icon-edit action" @click.stop="item.idEdit = true"></i>
                <i class="el-icon-delete action" @click.stop="deleteConversation(item)"></i>
              </template>
            </li>
          </ul>
        </div>
      </div>
      <div class="setting">
        <ul>
          <li @click="rmAll">
            <i class="el-icon-delete"></i>
            <span>清空对话</span>
          </li>
          <li @click="changeMode">
            <i :class="$store.state.mode === 'light' ? 'el-icon-sunrise-1' : 'el-icon-moon'"></i>
            <span>{{ $store.state.mode === 'light' ? '深色模式' : '浅色模式' }}</span>
          </li>
          <li @click="logStatus">
            <i :class="$store.state.token ? 'el-icon-download' : 'el-icon-upload2'"></i>
            <span>{{ $store.state.token ? '登出' : '登录' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </el-drawer>
</template>
<script>
import { getChatList, newChat, editChat, rmAll, rmSingle } from '@api'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drawer: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      conversationList: []
    }
  },
  watch: {
    show() {
      this.drawer = !!this.show
      // el-drawer加载时不会渲染内容，第一次展开才会渲染，关闭也会一直渲染，展开需要添加滚动监听（或者自己定义抽屉组件）
      if (this.drawer) {
        if (this.pageInfo.currentPage * this.pageInfo.pageSize < this.pageInfo.total) {
          this.addScroll(true)
        }
      } else {
        this.addScroll(false)
      }
    },
    '$store.state.token': {
      handler(value) {
        this.reset()
        if (value) {
          this.getChatList()
        }
      },
      immediate: true
    }
  },
  methods: {
    closed() {
      this.$emit('update:show', false)
    },
    reset() {
      this.pageInfo.currentPage = 1
      this.pageInfo.total = 0
      this.conversationList = []
    },
    getChatList() {
      getChatList({
        pageSize: this.pageInfo.pageSize,
        currentPage: this.pageInfo.currentPage
      }).then(data => {
        if (!data.records.length) return this.addChat()
        const list = data.records.map(item => {
          return { ...item, idEdit: false }
        })
        this.conversationList = [...this.conversationList, ...list]
        this.pageInfo.total = data.total
        if (!this.$store.state.activeConversation.id) {
          this.$store.commit('updateActiveConversation', this.conversationList[0])
        }
        if (this.pageInfo.currentPage * this.pageInfo.pageSize < this.pageInfo.total) {
          this.addScroll(true)
        }
      })
    },
    addScroll(bool) {
      this.$nextTick(() => {
        if (bool) {
          this.$refs.scrollbar.addEventListener('scroll', this.scrollHandle)
        } else {
          this.$refs.scrollbar.removeEventListener('scroll', this.scrollHandle)
        }
      })
    },
    scrollHandle(e) {
      const scrollHeight = e.target.scrollHeight
      const offsetHeight = e.target.offsetHeight
      const scrollTop = e.target.scrollTop
      if (scrollHeight - offsetHeight - scrollTop - 20 <= 0) {
        // 移动端滚动到底部，会执行多次，所以先移除监听
        this.addScroll(false)
        this.pageInfo.currentPage++
        this.getChatList()
      }
    },
    addChat() {
      newChat({ chatName: '新建聊天' }).then(data => {
        this.reset()
        this.getChatList()
      })
    },
    editChat(item) {
      editChat({ chatName: item.chatName, id: item.id }).then(data => {
        item.idEdit = false
      })
    },
    chooseConversion(item) {
      this.$store.commit('updateActiveConversation', item)
    },
    deleteConversation(data) {
      rmSingle({ chatId: data.id }).then(() => {
        if (this.$store.state.activeConversation.id === data.id) {
          this.$store.commit('updateActiveConversation', {})
        }
        this.reset()
        this.getChatList()
      })
    },
    rmAll() {
      rmAll().then(data => {
        this.reset()
        this.$store.commit('updateActiveConversation', {})
        this.addChat()
      })
    },
    changeMode() {
      this.$store.commit('updateMode', this.$store.state.mode === 'light' ? 'dark' : 'light')
    },
    logStatus() {
      this.drawer = false
      this.$store.dispatch('logStatus')
    }
  }
}
</script>

<style scoped lang="scss">
.chat-bar {
  width: 100%;
  height: 100%;
  padding: 0.1rem;
  box-sizing: border-box;
  background: #202123;
  display: flex;
  flex-direction: column;

  .top {
    .add-conversation {
      width: 100%;
      text-align: left;
      font-size: 14px;
      padding: 0.2rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      color: #fff;
      line-height: 0.3rem;
      box-sizing: border-box;

      i {
        margin-right: 8px;
        font-weight: bold;
      }
    }
  }

  .content {
    flex: 1;
    overflow: auto;
    margin-top: 10px;
    height: 100%;

    .conversation-list {
      height: 100%;

      ul {
        height: 100%;
        overflow-y: auto;
      }

      li {
        @include flex-align;
        padding: 0.15rem;
        border-radius: 0.1rem;
        font-size: 0.3rem;
        color: #fff;
        margin-bottom: 0.1rem;
        cursor: pointer;

        &.checked {
          background: rgba(52, 53, 65, 0.9);

          .el-icon-caret-right {
            transform: rotate(90deg);
          }

          .conversation-name {
            .cover {
              background: linear-gradient(to left, rgba(52, 53, 65, 0.9) 0, rgba(52, 53, 65, 0) 70%);
            }
          }
        }
        i {
          color: rgb(163, 163, 163);
          font-size: 0.35rem;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.3s;

          &.action {
            padding: 0.1rem;
          }
        }

        .conversation-name,
        input {
          width: 100%;
          margin-left: 0.2rem;
        }

        .conversation-name {
          padding-left: 0.05rem;
          @include overflow-ellipsis;
          position: relative;

          .cover {
            width: 0.6rem;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            background: linear-gradient(to left, #202123 0, rgba(32, 33, 35, 0) 70%);
          }
        }

        input {
          border: 0;
          outline: none;
          background: transparent;
          color: #fff;
        }
      }
    }
  }

  .setting {
    height: 3rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    ul {
      margin-top: 0.15rem;
    }

    li {
      @include flex-align;
      padding: 0.25rem;
      border-radius: 0.1rem;
      font-size: 14px;
      color: #fff;
      margin-bottom: 0.1rem;
      cursor: pointer;
      i {
        font-size: 0.35rem;
      }

      span {
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
