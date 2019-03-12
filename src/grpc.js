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
  call({ client, method, req, options }) {
    const cl = new client(this.endpoint)
    const opts = Object.assign({}, this.defaultOptions, options)
    if (!opts.deadline) {
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
