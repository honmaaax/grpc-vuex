export default class GRPC {
  constructor (endpoint) {
    this.defaultOptions = {}
    if (endpoint) {
      this.endpoint = endpoint
    } else {
      throw new Error('Invalid endpoint')
    }
  }
  getDeadline(sec = 5) {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + sec);
    return deadline.getTime()
  }
  call({ client, method, req, options }) {
    const cl = new client(this.endpoint)
    const opts = Object.assign({}, this.defaultOptions, options)
    if (!this.defaultOptions.deadline) {
      opts.deadline = this.getDeadline()
    }
    return cl[method](req, opts)
      .catch((err)=>this.error(err, { method, req }))
  }
  error (err, { method, req }) {
    return Promise.resolve()
      .then(()=>{
        if (this.onError) return this.onError(err, req, method)
      })
      .then(()=>{
        console.error(err)
        throw err
      })
  }
}
