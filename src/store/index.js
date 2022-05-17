import { Store, createStore, createLogger, useStore } from 'vuex'
import learn_logs from './modules/learn_logs'

/**
 * 1. 应用层级的状态应该集中到单个store对象中。
 * 2. 提交mutation是更改状态的唯一办法，并且这个过程是同步的。
 * 3. 异步逻辑都应该封装到action里面。
 *
 */
const debug = true

const plugin = (store) => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    console.log(mutation)
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
  })
}

export default createStore({
  modules: {
    learn_logs,
  },
  strict: debug,
  plugins: [plugin, createLogger()]
})

export const useAppStore = () => useStore()
