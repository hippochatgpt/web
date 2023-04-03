<template>
  <div class="loginbox">
    <transition name="mask">
      <div class="mask" v-show="visible"></div>
    </transition>
    <transition name="msgbox-fade">
      <div class="login-box__wrapper" v-show="visible">
        <div class="login-box">
          <!--          <div class="login-box__header">-->
          <!--            <div class="login-box__title">-->
          <!--              <span>{{ activeName === 'login' ? '登录' : '注册' }}</span>-->
          <!--            </div>-->
          <!--            <button type="button" class="login-box__headerbtn" @click="handleAction('cancel')" @keydown.enter="handleAction('cancel')">-->
          <!--              <i class="el-icon-close"></i>-->
          <!--            </button>-->
          <!--          </div>-->
          <div class="login-box__content">
            <div class="login-box__container">
              <el-tabs v-model="activeName">
                <el-tab-pane label="登录" name="login" />
                <el-tab-pane label="注册" name="logon" />
              </el-tabs>
              <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                <el-form-item label="用户名称" prop="userName" v-if="activeName === 'logon'">
                  <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="注册方式">
                  <el-radio-group v-model="form.type">
                    <el-radio label="1">手机号</el-radio>
                    <el-radio label="2">邮箱</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNum" v-if="form.type === '1'">
                  <el-input v-model="form.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mailAccount " v-else>
                  <el-input v-model="form.mailAccount"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="login-box__btns">
            <el-button size="small" @click="handleAction('cancel')">取消</el-button>
            <el-button type="primary" size="small" @click="submit">提交</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import '@utils/rem'
import { register, login } from '@api'
import store from '@/store'
export default {
  data() {
    return {
      visible: false,
      action: '',
      callback: null,

      activeName: 'login',
      form: {
        type: '1',
        userName: '',
        phoneNum: '',
        mailAccount: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        mailAccount: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    doClose() {
      if (!this.visible) return
      this.visible = false
      this.onClose && this.onClose()
      this.opened = false

      if (this.action) this.callback(this.action, this)
      this.form = {
        type: '1',
        phoneNum: '',
        mailAccount: '',
        password: ''
      }
      this.$refs['form'].resetFields()
    },
    handleAction(action) {
      this.action = action
      this.doClose()
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.activeName === 'logon') {
            register({
              userName: this.form.userName,
              phoneNum: this.form.type === '1' ? this.form.phoneNum : null,
              mailAccount: this.form.type === '2' ? this.form.mailAccount : null,
              password: this.form.password
            }).then(data => {
              sessionStorage.setItem('token', data)
              store.commit('updateToken', data)
              this.handleAction('confirm')
            })
          } else {
            login({
              phoneNum: this.form.type === '1' ? this.form.phoneNum : null,
              mailAccount: this.form.type === '2' ? this.form.mailAccount : null,
              password: this.form.password
            }).then(data => {
              sessionStorage.setItem('token', data)
              store.commit('updateToken', data)
              this.handleAction('confirm')
            })
          }
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('hashchange', this.doClose)
    })
  },
  beforeDestroy() {
    this.$nextTick(() => {
      window.addEventListener('hashchange', this.doClose)
    })
  }
}
</script>
<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 999;
}
.mask-enter-active {
  animation: mask-in 0.2s ease;
}

.mask-leave-active {
  animation: mask-out 0.2s ease forwards;
}
@keyframes mask-in {
  0% {
    opacity: 0;
  }
}
@keyframes mask-out {
  100% {
    opacity: 0;
  }
}

.login-box__wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1000;
  &::after {
    content: '';
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }

  .login-box {
    display: inline-block;
    vertical-align: middle;
    width: 6rem;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    backface-visibility: hidden;
    overflow: hidden;
    padding: 0 0 10px 0;
    .login-box__header {
      height: 42px;
      padding: 15px 26px 0;
      @include flex-align;

      .login-box__title {
        flex: 1;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 0.3rem;
        line-height: 1;
        color: #101010;
        position: relative;
        font-weight: bold;
        @include overflow-ellipsis;
        .el-icon-warning {
          color: #faad15;
          font-size: 16px;
          font-weight: normal;
        }
      }
      .login-box__headerbtn {
        width: 16px;
        height: 16px;
        padding: 0;
        border: none;
        outline: 0;
        background: 0 0;
        font-size: 16px;
        cursor: pointer;
        .el-icon-close {
          color: #101010;
        }
      }
    }
    .login-box__content {
      font-size: 12px;
      padding: 20px 26px;
      line-height: 20px;
      color: #101010cc;
      &.center {
        text-align: center;
      }
      .login-box__message {
        line-height: 30px;
      }
    }
    .login-box__btns {
      padding: 0 26px;
      text-align: center;
      &.center {
        text-align: center;
      }
    }
  }
}

.msgbox-fade-enter-active {
  animation: msgbox-fade-in 0.3s;
}
.msgbox-fade-leave-active {
  animation: msgbox-fade-out 0.3s;
}
@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
