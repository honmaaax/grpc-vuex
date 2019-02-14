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
    return (new Date()).setSeconds((new Date()).getSeconds() + sec)
  }
  call({ client, method, req, options }) {
    const cl = new client(this.endpoint)
    const opts = Object.assign({}, this.defaultOptions, options)
    if (!this.defaultOptions.deadline) {
      opts.deadline = this.getDeadline()
    }
    return cl[method](req, opts)
      .catch(this.error)
  }
  error (err) {
    console.error(err)
    return Promise.reject(err)
  }
}
