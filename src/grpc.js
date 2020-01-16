export default class GRPC {
  constructor (endpoint) {
    this.defaultOptions = {}
    if (endpoint) {
      this.endpoint = endpoint
    }
  }
  getDeadline(sec = 30) {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + sec);
    return deadline.getTime().toString()
  }
  call({ client, method, req, options, params }) {
    const cl = new client(this.endpoint)
    const opts = Object.assign({}, this.defaultOptions, options)
    if (!opts.deadline) {
      opts.deadline = this.getDeadline()
    }
    return Promise.resolve()
      .then(()=>{
        if (this.before) return this.before()
      })
      .then(() => {
        const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => { })
        enableDevTools([cl.delegateClient_])

        return cl[method](req, opts)
      })
      .catch((err)=>this.error(err, { method, params }))
  }
  error (err, { method, params }) {
    return Promise.resolve()
      .then(()=>{
        if (this.onError) return this.onError(err, params, method)
      })
      .then(()=>{
        console.error(err)
        throw err
      })
  }
}
