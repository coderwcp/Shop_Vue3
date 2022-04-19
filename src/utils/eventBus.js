// 事件总线

import mitt from 'mitt'

const emitter = mitt()

export default {
  $on: (event, fn) => emitter.on(event, fn),
  $emit: (event, payload) => emitter.emit(event, payload),
  $off: (event, fn) => emitter.off(event, fn)
}
