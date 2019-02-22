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
      .catch(this.error)
  }
  error (err) {
    console.error(err)
    throw err
  }
}
