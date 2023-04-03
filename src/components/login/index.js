import Vue from 'vue'
import login from './login.vue'

const loginConstructor = Vue.extend(login)
let instance
let loginQueue = {}

const initInstance = () => {
  instance = new loginConstructor({
    el: document.createElement('div')
  })
  instance.callback = defaultCallback
}

const defaultCallback = action => {
  if (loginQueue.resolve) {
    if (action === 'confirm') {
      loginQueue.resolve(action)
    } else if (loginQueue.reject && action === 'cancel') {
      loginQueue.reject(action)
    }
  }
}

const showNextMsg = () => {
  if (!instance) {
    initInstance()
  }
  instance.action = ''
  if (!instance.visible) {
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.visible = true
    })
  }
}

const MessageBox = function () {
  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      loginQueue = {
        resolve: resolve,
        reject: reject
      }
      showNextMsg()
    })
  }
}
export default MessageBox
