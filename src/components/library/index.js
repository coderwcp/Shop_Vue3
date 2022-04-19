
const importFn = require.context('./', true, /\.vue$/)

export default {
  install (app) {
    importFn.keys().forEach(path => {
      const component = importFn(path).default
      app.component(component.name, component)
    })
  }
}
